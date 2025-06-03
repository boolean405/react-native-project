import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import styles from "../../assets/styles/verify.styles";
import colors from "../../assets/constants/colors";
import { resendCode, verify } from "../../services/authApi";

export default function Verify() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const resendDuration = 60; // 1 minute in seconds
  const [isLoading, setIsLoading] = useState(false);

  const { name, username, email, password } = useLocalSearchParams();
  const inputs = useRef([]);

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      // All digits filled — verify with small delay to allow input to update
      const timer = setTimeout(() => {
        handleVerify();
      }, 100); // slight delay to ensure UI is updated
      return () => clearTimeout(timer); // clean up if code changes quickly
    }
  }, [code]);

  useEffect(() => {
    if (resendTimer === 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      if (index < 5) inputs.current[index + 1].focus();
    } else if (text === "") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const joinedCode = code.join("");

    if (!/^\d{6}$/.test(joinedCode)) {
      Alert.alert("Error", "Please enter a valid 6-digit code.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await verify({ email, code: joinedCode });
      Alert.alert("Success", result.message || "Account verified!");

      // Navigate or do something after verification (like sign in)
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Verification Failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    Alert.alert(
      "Code Sent",
      "A new verification code has been sent to your email."
    );
    try {
      const result = await resendCode({
        name,
        username,
        email,
        password,
      });
      Alert.alert("Success", "Verification code resent to your email.");
    } catch (error) {
      Alert.alert("Resend Failed", error.message);
    } finally {
      setIsLoading(false);
    }

    setResendTimer(resendDuration);
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Verify Your Email</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code we sent to your email.
            </Text>
            <Text style={styles.subtitle}>
              *Don't forget to check also in 'Spam'*
            </Text>
          </View>

          {/* Code Input */}
          <View style={styles.inputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={styles.textInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              (code.includes("") || isLoading) && styles.buttonDisabled,
            ]}
            onPress={handleVerify}
            disabled={code.includes("") || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>Verify</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleResendCode}
            style={{ marginTop: 20 }}
            disabled={resendTimer > 0}
          >
            <Text
              style={[
                styles.link,
                {
                  textAlign: "center",
                  color: resendTimer > 0 ? "gray" : colors.primary,
                },
              ]}
            >
              {resendTimer > 0
                ? `Resend Code in ${formatTime(resendTimer)}`
                : "Resend Code"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

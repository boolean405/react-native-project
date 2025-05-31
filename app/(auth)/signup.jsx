import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../../assets/constants/colors";
import logo from "../../assets/images/logo.png";
import styles from "../../assets/styles/signup.styles";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "";

  const handleSignup = () => {};

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Container */}

        <View style={styles.container}>
          {/* Top illustration */}
          <View style={styles.topIllustration}>
            <Image
              source={logo}
              style={styles.illustrationImage}
              contentFit="contain"
            />
          </View>
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>KKhay Account</Text>
              <Text style={styles.subtitle}>Sign Up to open the World!</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* name input */}
              <View style={styles.inputGroup}>
                {/* <Text style={styles.label}>Name</Text> */}
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="person-outline"
                    size={24}
                    color={colors.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor={colors.placeholderText}
                    value={name}
                    onChangeText={setName}
                    onBlur={() => setName(name.trim())} // Trim only after typing ends
                  />
                </View>
              </View>

              {/* Username input */}
              <View style={styles.inputGroup}>
                {/* <Text style={styles.label}>Username</Text> */}
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="at-outline"
                    size={24}
                    color={colors.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor={colors.placeholderText}
                    value={username}
                    autoCapitalize="none"
                    onChangeText={(text) => {
                      // Remove spaces and convert to lowercase
                      const sanitized = text.replace(/\s/g, "").toLowerCase();
                      setUsername(sanitized);
                    }}
                  />
                </View>
              </View>

              {/* Email input */}
              <View style={styles.inputGroup}>
                {/* <Text style={styles.label}>Email</Text> */}
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={24}
                    color={colors.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={colors.placeholderText}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(text) => {
                      // Remove spaces and convert to lowercase
                      const sanitized = text.replace(/\s/g, "").toLowerCase();
                      setEmail(sanitized);
                    }}
                  />
                </View>
              </View>

              {/* Password */}
              <View style={styles.inputGroup}>
                {/* <Text style={styles.label}>Password</Text> */}
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={24}
                    color={colors.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={colors.placeholderText}
                    value={password}
                    secureTextEntry={!showPassword}
                    // When setting password, remove spaces:
                    onChangeText={(text) =>
                      setPassword(text.replace(/\s/g, ""))
                    }
                  />

                  {/* Right show password icon */}
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color={colors.primary}
                    style={styles.inputIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                </View>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputGroup}>
                {/* <Text style={styles.label}>Confirm Password</Text> */}
                <View
                  style={[
                    styles.inputContainer,
                    error && { borderColor: "red" },
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={24}
                    color={colors.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor={colors.placeholderText}
                    value={confirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    // When setting confirm password, remove spaces:
                    onChangeText={(text) =>
                      setConfirmPassword(text.replace(/\s/g, ""))
                    }
                  />

                  {/* Right show confirm password icon */}
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-off-outline" : "eye-outline"
                    }
                    size={24}
                    color={colors.primary}
                    style={styles.inputIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </View>

                {/* Error message */}
                {error ? (
                  <Text style={{ color: "red", marginTop: 4 }}>{error}</Text>
                ) : null}
              </View>

              {/* Signup button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  (!isFormValid || isLoading || error) && styles.buttonDisabled,
                ]}
                onPress={handleSignup}
                disabled={!isFormValid || isLoading || error}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.link}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

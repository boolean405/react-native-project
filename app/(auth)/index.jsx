import { useState } from "react";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import styles from "../../assets/styles/signin";
import logo from "../../assets/images/logo.png";
import colors from "../../assets/constants/colors";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSignin = () => {};
  const handleForgotPassword = () => {};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
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
              <Text style={styles.subtitle}>Sign In to open the World!</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Email */}
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

              {/* Signin button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  (!isFormValid || isLoading) && styles.buttonDisabled,
                ]}
                onPress={handleSignin}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.buttonText}>Sign In</Text>
                )}
              </TouchableOpacity>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <Link href="/signup" asChild>
                  <TouchableOpacity>
                    <Text style={styles.link}>Sign Up</Text>
                  </TouchableOpacity>
                </Link>
              </View>

              {/* Forgot password */}
              <Link href="/forgot-password" asChild>
                <TouchableOpacity
                  onPress={handleForgotPassword}
                  style={{ marginTop: 5 }}
                >
                  <Text style={[styles.link, { textAlign: "center" }]}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

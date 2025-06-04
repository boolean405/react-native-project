import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import styles from "../../assets/styles/signup.styles"; // reusing signup styles
import colors from "../../assets/constants/colors";
import logo from "../../assets/images/logo.png"; // reuse your logo

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("john_doe");
  const [email, setEmail] = useState("johndoe@example.com");

  const handleSave = () => {
    Alert.alert("Profile Updated", "Your changes have been saved.");
  };

  const handleLogout = () => {
    Alert.alert("Logged Out", "You have been logged out.");
    // Add actual logout logic here
  };

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
          {/* Top logo */}
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
              <Text style={styles.title}>My Profile</Text>
              <Text style={styles.subtitle}>
                View and update your account info
              </Text>
            </View>

            {/* Profile Form */}
            <View style={styles.formContainer}>
              {/* Name */}
              <View style={styles.inputGroup}>
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
                  />
                </View>
              </View>

              {/* Username */}
              <View style={styles.inputGroup}>
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
                    onChangeText={(text) =>
                      setUsername(text.replace(/\s/g, "").toLowerCase())
                    }
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputGroup}>
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
                    onChangeText={(text) =>
                      setEmail(text.replace(/\s/g, "").toLowerCase())
                    }
                  />
                </View>
              </View>

              {/* Save Button */}
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>

              {/* Logout Button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: "#ccc", marginTop: 10 },
                ]}
                onPress={handleLogout}
              >
                <Text style={[styles.buttonText, { color: "#333" }]}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity } from "react-native";
import styles from "../assets/styles/profile.styles";
import { signout } from "../services/authApi"; // create this if not yet
import { clearUserData } from "../store/authStore";

export default function SignoutButton() {
  const handleSignOut = async () => {
    try {
      await signout(); // calls backend to clear cookies/server token
      await clearUserData(); // clear local storage
      router.replace("/(auth)"); // navigate to login screen
    } catch (error) {
      Alert.alert("Error", error.message || "Signout failed.");
    }
  };

  const confirmSignOut = () => {
    Alert.alert(
      "Signout",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Signout", onPress: handleSignOut, style: "destructive" },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity style={styles.signoutButton} onPress={confirmSignOut}>
      <Ionicons name="log-out-outline" size={24} color="white" />
      <Text style={styles.signoutText}>Signout</Text>
    </TouchableOpacity>
  );
}

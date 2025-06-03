import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import styles from "../../assets/styles/profile.styles";
import ProfileHeader from "../../components/profile-header";
import SignoutButton from "../../components/signout-button";

export default function Menu() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const router = useRouter();

  const { user } = useAuthStore();

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <SignoutButton />
    </View>
  );
}

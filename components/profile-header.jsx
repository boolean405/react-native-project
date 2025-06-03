import { Image } from "expo-image";
import { Text, View } from "react-native";

import { useEffect, useState } from "react";
import styles from "../assets/styles/profile.styles";
import { getUserData } from "../store/authStore";

export default function ProfileHeader() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const savedUser = await getUserData();
      setUser(savedUser);
    }
    loadUser();
  }, []);

  return (
    <View style={styles.profileHeader}>
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_API_URL}/api/user/picture/${user?._id}`,
        }}
        style={styles.profileImage}
        contentFit="cover"
      />
      <View style={styles.profileInfo}>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.username}>@{user?.username}</Text>
        <Text>Joined since: {new Date(user?.createdAt).getFullYear()}</Text>
      </View>
    </View>
  );
}

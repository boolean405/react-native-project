import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

import styles from "../../assets/styles/flash.styles";
import logo from "../../assets/images/logo.png";
import { getUserData } from "../../store/authStore";

export default function Flash() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const router = useRouter();

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();

    const checkAuth = async () => {
      const user = await getUserData();

      // Optional: wait for animation or splash effect
      setTimeout(() => {
        if (user) {
          router.replace("/(tabs)"); // go to home screen
        } else {
          router.replace("/(auth)/signin"); // go to sign-in screen
        }
      }, 1000); // adjust timeout as needed
    };

    checkAuth();

    return () => pulse.stop(); // Clean up
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.topIllustration,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={logo}
          style={styles.illustrationImage}
          contentFit="contain"
        />
        <View style={styles.header}>
          <Text style={styles.title}>K Khay</Text>
          <Text style={styles.subtitle}>Explore the World!</Text>
        </View>
      </Animated.View>
    </View>
  );
}

import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { Image } from "expo-image";

import styles from "../../assets/styles/flash.styles";
import logo from "../../assets/images/logo.png";

export default function FlashScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

    return () => pulse.stop(); // Clean up animation on unmount
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated logo */}
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>K Khay</Text>
          <Text style={styles.subtitle}>Explore the World!</Text>
        </View>
      </Animated.View>
    </View>
  );
}

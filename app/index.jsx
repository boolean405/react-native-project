import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/(auth)/signup">Sign Up</Link>
      <Link href="/(auth)/forgotpassword">Forgot Password</Link>
      <Link href="/(auth)">Sign In</Link>
    </View>
  );
}

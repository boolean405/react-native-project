import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getUserData } from "../../store/authStore";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const savedUser = await getUserData();
      setUser(savedUser);
    }
    loadUser();
  }, []);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Name: {user?.name}</Text>
      <Text>Username: {user?.username}</Text>
      <Text>Email: {user?.email}</Text>
    </View>
  );
}

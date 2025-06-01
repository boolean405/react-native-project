import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const useAuthStore = create((set) => ({
  user: null,
  token: null,

  signup: async (name, username, email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // await AsyncStorage.setItem("user", JSON.stringify(data));
      // await AsyncStorage.setItem("token", data.result.accessToken);

      // set({ user: data.result });
      return data;
    } catch (error) {
      return { message: error.message };
    }
  },

  signin: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.status) throw new Error(data.message);

      await AsyncStorage.setItem("user", JSON.stringify(data.result));
      await AsyncStorage.setItem("token", data.result.accessToken);

      set({ user: data.result });
      return data;
    } catch (error) {
      return { message: error.message };
    }
  },
}));

export default useAuthStore;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const useAuthStore = create((set) => ({
  user: null,
  // token: "",

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
      if (!data.status) throw new Error(data.message);

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
        credentials: "include",
      });

      const data = await response.json();
      if (!data.status) throw new Error(data.message);
      // console.log(data);

      // const setCookieHeader = response.headers.get("set-cookie");
      // if (setCookieHeader) {
      //   // Use regex or split to extract the token
      //   const match = setCookieHeader.match(/refreshToken=([^;]+)/);
      //   const token = match ? match[1] : null;

      //   console.log("Extracted token:", token);
      // }

      // await AsyncStorage.setItem("user", JSON.stringify(data.result));
      // await AsyncStorage.setItem("token", data.result.accessToken);

      set({ user: data.result });
      return data;
    } catch (error) {
      return { message: error.message };
    }
  },

  checkAuth: async () => {
    try {
      const response = await fetch(`${API_URL}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (!data.status) throw new Error(data.message);

      set({ user: data.result });
      return data;
    } catch (error) {
      return { message: error.message };
    }
  },

  signout: async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (!data.status) throw new Error(data.message);

      // await AsyncStorage.removeItem("user");
      // await AsyncStorage.removeItem("token");
      // console.log(data);
      
      set({ user: null });
      return data;
    } catch (error) {
      return { message: error.message };
    }
  },
}));

export default useAuthStore;

import axios from "axios";
import { saveUserData } from "../store/authStore";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async ({ name, username, email, password }) => {
  try {
    const response = await api.post("/api/user/signup", {
      name,
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Signup failed");
    } else {
      throw new Error(error.message || "Signup failed");
    }
  }
};

export const signin = async ({ email, password }) => {
  try {
    const response = await api.post(
      "/api/user/signin",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    await saveUserData(response.data.result, response.data.result.accessToken);

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Signin failed");
    } else {
      throw new Error(error.message || "Signin failed");
    }
  }
};

export const verify = async ({ email, code }) => {
  try {
    const response = await api.post(
      "/api/user/verify",
      { email, code },
      {
        withCredentials: true,
      }
    );
    console.log(response.data.status);

    if (response.data.status)
      await saveUserData(
        response.data.result,
        response.data.result.accessToken
      );

    return response.data;
  } catch (error) {
    console.log("Verification error:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Verification failed");
    } else {
      throw new Error("Network error or server not reachable");
    }
  }
};

export const resendCode = async ({ name, username, email, password }) => {
  try {
    const response = await api.post("/api/user/signup", {
      name,
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("Resend error", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Resend failed");
    } else {
      throw new Error("Network error or server not reachable");
    }
  }
};

export const signout = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/signout`,
      {},
      {
        withCredentials: true, // ensures cookies are sent
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to sign out");
  }
};

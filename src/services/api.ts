import axios from "axios";
import { MessageStats, User } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

interface LoginResponse {
  accessToken: string;
  user: User;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    console.log({ email, password });
    const response = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    console.log({ response });
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const registerUser = async (data: RegisterData): Promise<User> => {
  try {
    const response = await api.post<User>("/auth/signup", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
    throw new Error("An unexpected error occurred");
  }
};

const getAuthHeaders = (): { Authorization: string } => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No token found, please login first");
  }
  return { Authorization: `Bearer ${token}` };
};

export const fetchUserMessages = async () => {
  const headers = getAuthHeaders();
  const response = await api.get("/messages/user", { headers });
  return response.data;
};

export const getMessageDetail = async (id: string) => {
  if (id) {
    const headers = getAuthHeaders();
    const response = await api.get(`/messages/${id}`, { headers });
    return response.data;
  }
};
export const getUserMessageStats = async (
): Promise<MessageStats | undefined> => {
  try {
    const headers = getAuthHeaders();
    const response = await api.get("/messages/stats", { headers });
    return response.data;
  } catch (error) {
    console.log("could not fetch stats", error);
  }
};

export const markMessageAsRead = async (id: string) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.get(`/messages/mark-read/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.log("could not mark message as read", error);
  }
};

export const markMessageAsUnRead = async (id: string) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.get(`/messages/mark-unread/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.log("could not mark message as read", error);
  }
};

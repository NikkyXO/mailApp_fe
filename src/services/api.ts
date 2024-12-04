import axios from 'axios';
import { Message, MessageStats, User } from '../types';


const api = axios.create({   
    baseURL: import.meta.env.VITE_API_URL,
    // timeout: 10000, // 10 second timeout
    headers: {       
      'Content-Type': 'application/json',
      'Accept': 'application/json'
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
  
  
  export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', {
        username,
        password,
      });
      localStorage.setItem('access_token', response.data.accessToken);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw new Error('An unexpected error occurred');
    }
  };
  
  export const registerUser = async (data: RegisterData): Promise<User> => {
    try {
      const response = await api.post<User>('/auth/signup', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
      throw new Error('An unexpected error occurred');
    }
  };


export const getUser = async (): Promise<User> => {
  try {
    const response = await api.get('/users');
    return response.data[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'get user failed');
    }
    throw new Error('An unexpected error occurred');
  }
};


export const fetchUserMessages = async (userId: string) => {    
    const response = await api.get('/messages/user', { params: { userId } }); 
    return response.data;
  };
  
 export const getMessageDetail = async (id: string) => {
  if (id) {
    const response = await api.get<Message>(`/messages/${id}`);
    return response.data;
  }
 }
 export const getUserMessageStats = async (userId: string): Promise<MessageStats | undefined> => {
  try {
    if (userId) {
      const response = await api.get('/messages/stats', { params: { userId } });
      return response.data;
    }
  } catch (error) {
    console.log("could not fetch stats", error);
  }
 }

 export const markMessageAsRead = async (id: string) => {
  try {
    const response = await api.get(`/messages/mark-read/${id}`);
    return response.data;
  } catch (error) {
    console.log("could not mark message as read", error);
  }
 }

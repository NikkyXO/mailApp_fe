import axios from 'axios';
import { Message, MessageStats, User } from '../types';

console.log("baseUrl", import.meta.env.VITE_API_URL);


const api = axios.create({   
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',     
    headers: {       
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }, 
  });  



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
    const response = await api.get<Message>(`/messages/${id}`);
    return response.data;
 }
 export const getUserMessageStats = async (userId: string): Promise<MessageStats> => {
    const response = await api.get('/messages/stats', { params: { userId } });
    console.log({ stats1: response.data });
    return response.data;
 }

 export const markMessageAsRead = async (id: string) => {
    const response = await api.put(`/messages/${id}/read`);
    return response.data;
 }

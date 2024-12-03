import axios from 'axios';
import { Message, MessageStats, User } from '../types';

console.log("baseUrl", import.meta.env.VITE_API_URL);


const api = axios.create({   
    baseURL: import.meta.env.VITE_API_URL,     
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
  console.log("message by id", id);
    const response = await api.get<Message>(`/messages/${id}`);
    console.log("response single msg", response);
    return response.data;
 }
 export const getUserMessageStats = async (userId: string): Promise<MessageStats> => {
    const response = await api.get('/messages/stats', { params: { userId } });
    return response.data;
 }

 export const markMessageAsRead = async (id: string) => {
    const response = await api.patch(`/messages/mark-read`, {
      id
    });
    return response.data;
 }

import React, { useState, useCallback } from 'react';
import { RegisterUser, User} from '../types';
import { loginUser, registerUser,  } from '../services/api';
import { AuthContext } from './auth.context';
import { useEffect } from 'react';
import axios from 'axios';



export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);
  
    const login = useCallback( async (email: string, password: string) => {
      try {
        const response = await loginUser(email, password);
        const { accessToken, user } = response;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return true;
      } catch (error) {
        setError('Login failed');
        console.error('Login failed', error);
        return false;
      }
    }, []);

    const register = useCallback(async (data: RegisterUser) => {
      const { email, username, password } = data;
        try {
          await registerUser({
            username, password,
            email
          });
          return true;
        } catch (error) {
          setError('Registration failed');
          console.error('Registration', error);
          return false;
        }
      }, []);
  
    const logout =  () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, register, logout, error }}>
        {children}
      </AuthContext.Provider>
    );
  };
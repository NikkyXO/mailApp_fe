import React, { useState } from 'react';
import { User} from '../types';
import { loginUser, registerUser,  } from '../services/api';
import { AuthContext } from './auth.context';



export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    const login = async (username: string, password: string) => {
      try {
        const response = await loginUser(username, password);
        const { accessToken, user } = response;
        localStorage.setItem('access_token', accessToken);
        setUser(user);
        return true;
      } catch (error) {
        setError('Login failed');
        console.error('Login failed', error);
        return false;
      }
    };

    const register = async (username: string, password: string) => {
        try {
          await registerUser({username: username, password: password});
          return true;
        } catch (error) {
          setError('Registration failed');
          console.error('Registration', error);
          return false;
        }
      };
  
    const logout =  () => {
      localStorage.removeItem('access_token');
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, register, logout, error }}>
        {children}
      </AuthContext.Provider>
    );
  };
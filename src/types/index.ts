export interface User {
    id: string;
    username: string;
    email: string;
  }

  export interface MessageStats {
    total: number;
    unread: number;
    readCount: number;
  }

  export interface UserContextType {
    user: User | null;
    getUser: () => Promise<void>;
    error: string | null;
    isLoading: boolean;
  }


  
  export interface ApiError {
    message: string;
    statusCode: number;
  }
  
  export interface Message {
    id: string;
    username: string;
    subject: string;
    userId: string;
    content: string;
    read: boolean;
  }

  export interface MessageCreateData {
    username: string;
    subject: string;
    userId: string;
    content: string;
  }

  export interface AuthContextType {
    user: User | null;
    register: (username: string, password: string) => Promise<boolean>;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    error: string | null;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    email: string;
  }
  
  export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: User;
  }


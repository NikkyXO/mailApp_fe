export interface FormField {
  type: 'text' | 'password' | 'email' | 'hidden';
  placeholder: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormProps {
  fields: FormField[];
  onSubmit: (formData: Record<string, string>) => Promise<boolean>;
  submitButtonText: string;
  successMessage: string;
  successRedirectPath: string;
  className?: string;
  error?: string;
}


export interface User {
    _id: string;
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
    createdAt?: string;
  }

  export interface MessageCreateData {
    username: string;
    subject: string;
    userId: string;
    content: string;
  }

  export interface RegisterUser {
    username: string;
    email: string;
    password: string;
  }

  export interface AuthContextType {
    user: User | null;
    register: (data: RegisterUser) => Promise<boolean>;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    error: string | null;
    isAuthenticating?: boolean;
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


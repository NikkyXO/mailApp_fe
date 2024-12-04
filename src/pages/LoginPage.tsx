import React from 'react';
import { LoginForm } from '../components/forms/LoginForm';

export const LoginPage: React.FC = () => {

  return (
    <div className='h-screen bg-gray-900 flex flex-col'>
        <LoginForm 
        />
    </div>
  );
};
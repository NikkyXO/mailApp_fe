import React from 'react';
import { RegisterForm } from '../components/forms/RegisterForm';

export const RegisterPage: React.FC = () => {

  return (
    <div className=' w-screen h-screen bg-gray-900 flex flex-col space-y-4'>
        <RegisterForm/>
    </div>
  );
};
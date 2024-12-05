import React from 'react';
import { RegisterForm } from '../components/forms/RegisterForm';

export const RegisterPage: React.FC = () => {

  return (
     <div className='bg-gray-900 flex items-center justify-center h-screen'>
     <div className='bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md m-auto'>
       <div className='text-center mb-8'>
         <h1 className='text-3xl font-bold text-white mb-4'>Sign Up</h1>
       </div>
       <RegisterForm/>
     </div>
   </div>
  );
};
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { GenericForm } from "./CustomForm";
import { FormField } from "../../types";
import { Link } from "react-router-dom";

export const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  console.log('register form');

  const registerFields: FormField[] = [
    { type: 'email', placeholder: 'Email', value: '', onChange: () => {} },
    { type: 'text', placeholder: 'Username', value: '', onChange: () => {} },
    { type: 'password', placeholder: 'Password', value: '', onChange: () => {} }
  ];

  return (
    <div className="flex flex-col">
      <GenericForm
        fields={registerFields}
        onSubmit={async (formData) => {
          return await register({
            username: formData.username,
            email: formData.email,
            password: formData.password
          });
        }}
        submitButtonText="Register"
        successMessage="Registration successful!"
        successRedirectPath="/login"
      />
      <p className='mx-auto text-white mt-4'>Already registered?{' '} <Link to="/login" className="text-blue-400 hover:underline">Login</Link></p>
    </div>
  );
};
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { GenericForm } from "./CustomForm";
import { FormField } from "../../types";
import { Link } from "react-router-dom";

export const RegisterForm: React.FC = () => {
  const { register } = useAuth();

  const registerFields: FormField[] = [
    { type: 'text', placeholder: 'Username', value: '', onChange: () => {} },
    { type: 'password', placeholder: 'Password', value: '', onChange: () => {} }
  ];

  return (
    <div className="m-auto flex flex-col w-full">
      <GenericForm
        fields={registerFields}
        onSubmit={async (formData) => {
          return await register(formData.username, formData.password);
        }}
        submitButtonText="Register"
        successMessage="Registration successful!"
        successRedirectPath="/"
      />
      <p className='mx-auto text-white mt-4'>Already registered?{' '} <Link to="/" className="text-blue-400 hover:underline">Login</Link></p>
    </div>
  );
};
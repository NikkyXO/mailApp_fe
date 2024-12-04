import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { GenericForm } from "./CustomForm";
import { FormField } from "../../types";
import { Link } from "react-router-dom";

export const LoginForm: React.FC = () => {

  const { login } = useAuth();

  const loginFields: FormField[] = [
    { type: 'email', placeholder: 'Email', value: '', onChange: () => {} },
    { type: 'password', placeholder: 'Password', value: '', onChange: () => {} }
  ];


  return (
    <div className="m-auto flex flex-col w-full">

      <GenericForm
        fields={loginFields}
        onSubmit={async (formData) => {
          return await login(formData.email, formData.password);
        }}
        submitButtonText="Login"
        successMessage="Login successful!"
        successRedirectPath="/"
      />
      <p className='mx-auto text-white mt-4'>Not registered yet?{' '} <Link to="/signup" className="text-blue-400 hover:underline">Register</Link></p>
    </div>
  );
};

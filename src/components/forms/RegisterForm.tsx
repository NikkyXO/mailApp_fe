import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { GenericForm } from "./CustomForm";
import { FormField } from "../../types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoading } from "../../hooks/useLoading";
import { LoadingSpinner } from "../LoadingSpinner";

export const RegisterForm: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { register, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const registerFields: FormField[] = [
    { type: 'email', placeholder: 'Email', value: '', onChange: () => {} },
    { type: 'text', placeholder: 'Username', value: '', onChange: () => {} },
    { type: 'password', placeholder: 'Password', value: '', onChange: () => {} }
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <LoadingSpinner size={8} color="green-500" message="Registering..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <GenericForm
      error={error ?? ''}
        fields={registerFields}
        onSubmit={async (formData) => {
          startLoading();
          const result = await register({
            username: formData.username,
            email: formData.email,
            password: formData.password
          });
          stopLoading();
          if (result) {
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
          return true

          } else {
            return false
          }
          
          
        }}
        submitButtonText="Register"
        successMessage="Registration successful!"
        successRedirectPath="/login"
      />
      <p className='mx-auto text-white mt-4'>Already registered?{' '} <Link to="/login" className="text-blue-400 hover:underline">Login</Link></p>
    </div>
  );
};
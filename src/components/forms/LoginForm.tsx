import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { GenericForm } from "./CustomForm";
import { FormField } from "../../types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoading } from "../../hooks/useLoading";
import { LoadingSpinner } from "../LoadingSpinner";

export const LoginForm: React.FC = () => {

  const { login } = useAuth();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();


  const loginFields: FormField[] = [
    { type: 'email', placeholder: 'Email', value: '', onChange: () => {} },
    { type: 'password', placeholder: 'Password', value: '', onChange: () => {} }
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <LoadingSpinner size={8} color="green-500" message="Logging in..." />
      </div>
    );
  }

  return (
    <div className=" flex flex-col ">

      <GenericForm
        fields={loginFields}
        onSubmit={async (formData) => {
            startLoading();
           const result = await login(formData.email, formData.password);
           if(result) {
            stopLoading();
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
            return true;
           } else {
              return false;

           }
        }}
        submitButtonText="Login"
        successMessage="Login successful!"
        successRedirectPath="/"
      />
      <p className='mx-auto text-white mt-4'>Not registered yet?{' '} <Link to="/signup" className="text-blue-400 hover:underline">Register</Link></p>
    </div>
  );
};

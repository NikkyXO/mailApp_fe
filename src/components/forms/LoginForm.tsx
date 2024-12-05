import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { GenericForm } from "./CustomForm";
import { FormField } from "../../types";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const loginFields: FormField[] = [
    { type: 'email', placeholder: 'Email', value: '', onChange: () => {} },
    { type: 'password', placeholder: 'Password', value: '', onChange: () => {} }
  ];

  return (
    <div className=" flex flex-col ">

      <GenericForm
        fields={loginFields}
        onSubmit={async (formData) => {
          
           const result = await login(formData.email, formData.password);
           if(result) {
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

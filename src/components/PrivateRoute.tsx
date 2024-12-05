import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "./LoadingSpinner";

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isAuthenticating } = useAuth();
  if (isAuthenticating) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
        <LoadingSpinner 
          message="Verifying authentication..." 
          size={8} 
          color="blue-500" 
        />
      </div>
    );
  }

  if (!user) {
    return (
        <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <>{children}</>;
};


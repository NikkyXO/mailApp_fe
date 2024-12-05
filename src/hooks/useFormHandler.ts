import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useFormHandler = (onSubmit: (formData: Record<string, string>) => Promise<boolean>, successRedirectPath: string, successMsg: string) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent, formData: Record<string, string>) => {
      e.preventDefault();
      
      // Basic validation: check if any field is empty
      const emptyFields = Object.entries(formData)
        .filter(([, value]) => !value.trim())
        .map(([key]) => key);
  
      if (emptyFields.length > 0) {
        setError(`${emptyFields.join(', ')} ${emptyFields.length === 1 ? 'is' : 'are'} required`);
        return;
      }
  
      setLoading(true);
      setError("");
      setSuccessMessage('');
  
      try {
        const success = await onSubmit(formData);
        if (success) {
          setSuccessMessage(successMsg);
        } else {
          setError(`Operation failed`);
        }
      } catch (error) {
        setError(`Failed. Please try again: ${error}`);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (successMessage) {
        const timer = setTimeout(() => {
          navigate(successRedirectPath);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }, [successMessage, navigate, successRedirectPath]);
  
    return {
      validationError: error,
      loading,
      successMessage,
      handleSubmit
    };
  };
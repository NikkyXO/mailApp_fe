import { FormProps } from "../../types";
import { useState } from "react";
import { useFormHandler } from "../../hooks/useFormHandler";

export const GenericForm: React.FC<FormProps> = ({
    fields,
    onSubmit,
    submitButtonText,
    successMessage,
    successRedirectPath,
    className = '',
  }) => {
    const [formData, setFormData] = useState<Record<string, string>>(
      fields.reduce((acc, field) => ({ ...acc, [field.placeholder.toLowerCase()]: '' }), {})
    );
    const { error, loading, successMessage: message, handleSubmit } = useFormHandler(
      onSubmit, 
      successRedirectPath,
      successMessage,
    );
  
    const updateField = (placeholder: string, value: string) => {
      setFormData(prev => ({
        ...prev,
        [placeholder.toLowerCase()]: value
      }));
    };
    return (
      <div className={`my-auto ${className}`}>
        {message && (
          <div className="w-1/2 mx-auto p-2 bg-green-400 text-white mb-3">
            {message}
          </div>
        )}
        {error && (
          <div className="w-1/2 mx-auto p-2 bg-red-100 text-red-700 mb-3">
            {error}
          </div>
        )}
        <form
          className='flex flex-col space-y-4'
          onSubmit={(e) => handleSubmit(e, formData)}
        >
          {fields.map((field, index) => (
            <input
              key={index}
              type={field.type}
              value={formData[field.placeholder.toLowerCase()] || ''}
              onChange={(e) => updateField(field.placeholder, e.target.value)}
              placeholder={field.placeholder}
              className="w-3/4 p-2 mx-auto border rounded"
            />
          ))}
          <button
            type="submit"
            className="w-1/2 p-2 mx-auto bg-blue-500 text-white rounded"
          >
            {submitButtonText}
          </button>
        </form>
          {loading && (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
      </div>
    );
  };
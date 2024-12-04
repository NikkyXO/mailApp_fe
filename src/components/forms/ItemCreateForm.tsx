import React from "react";
import { useItems } from "../../hooks/useItems";
import { FormField } from "../../types";
import { GenericForm } from "./CustomForm";


interface ItemCreateFormProps {
  onSuccess?: () => void;
}

export const ItemCreateForm: React.FC<ItemCreateFormProps> = ({ onSuccess } ) => {
  const { createItem } = useItems();

  const createItemFields: FormField[] = [
    { type: 'text', placeholder: 'name', value: '', onChange: () => {} },
    { type: 'text', placeholder: 'description', value: '', onChange: () => {} }
  ];

  return (
      <GenericForm
      className="mt-10"
        fields={createItemFields}
        onSubmit={async (formData) => {
          await createItem({ name: formData.name, description: formData.description });
          if (onSuccess) {
            onSuccess();
          }
          return true;
        }}
        submitButtonText="Create New Item"
        successMessage="Item created successfully!"
        successRedirectPath="/items"
      />
  );
};

import React from "react";
import { useItems } from "../../hooks/useItems";
import { FormField, Item } from "../../types";
import { GenericForm } from "./CustomForm";
import { fetchItems } from "../../services/api";

interface ItemEditFormProps {
  item: Item;
}

export const ItemEditForm: React.FC<ItemEditFormProps> = ({ item }) => {
  const { updateItem } = useItems();
  const editItemFields: FormField[] = [
    {
      type: "text",
      placeholder: "name",
      value: item.name,
      onChange: () => {}
    },
    {
      type: "text",
      placeholder: "description",
      value: item.description,
      onChange: () => {}
    },
  ];


  return (
    <GenericForm
      className="mt-10"
      fields={editItemFields}
      onSubmit={async (formData) => {
        await updateItem(item.id, {name: formData.name, description: formData.description});
        await fetchItems();
        return true;
      }}
      submitButtonText="Update Item"
      successMessage="Update Successful!"
      successRedirectPath="/items"
    />
  );
};

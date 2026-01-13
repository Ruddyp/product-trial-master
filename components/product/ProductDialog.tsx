"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { categories, Product } from "@/lib/mockData";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type ProductDialogProps = {
  open: boolean;
  closeDialog: () => void;
  product?: Product;
  onSave: (values: FormFields, id: number | undefined) => void;
};

export type FormFields = {
  name: string;
  price: number;
  description: string;
  category: string;
};

const initValues: FormFields = {
  name: "",
  price: 0,
  description: "",
  category: "",
};

export function ProductDialog({
  open,
  closeDialog,
  product,
  onSave,
}: ProductDialogProps) {
  const [formFields, setFormFields] = useState(initValues);

  // useEffect qui permet de mettre a jour le formulaire quand product ou open changent
  useEffect(() => {
    if (product) {
      setFormFields({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
      });
    } else {
      setFormFields(initValues);
    }
  }, [product, open]);

  function handleDialogOpenChange() {
    closeDialog();
  }

  function handleFormChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value, type } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [id]: type === "number" ? (value === "" ? 0 : parseFloat(value)) : value,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formFields.name || formFields.price < 0) {
      alert("Veuillez remplir les champs correctement");
      return;
    }

    onSave(formFields, product?.id);
    closeDialog();
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent
        className="w-4/5"
        onInteractOutside={() => closeDialog()}
        aria-describedby={undefined}
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle>Ajout/Edition produit</DialogTitle>
          </DialogHeader>
          <FieldGroup className="gap-4">
            <Field className="gap-2">
              <FieldLabel htmlFor="name">Nom</FieldLabel>
              <Input
                id="name"
                type="text"
                value={formFields.name}
                onChange={(event) => handleFormChange(event)}
              />
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="price">Prix</FieldLabel>
              <Input
                id="price"
                type="number"
                value={formFields.price}
                onChange={(event) => handleFormChange(event)}
              />
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                value={formFields.description}
                onChange={(event) => handleFormChange(event)}
                rows={4}
              />
            </Field>
            <Field className="gap-2">
              <FieldLabel>Catégorie</FieldLabel>
              <Select
                value={formFields.category}
                onValueChange={(value) =>
                  setFormFields({ ...formFields, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <DialogFooter className="flex flex-row  justify-between sm:justify-between items-center mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => closeDialog()}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={!formFields.name ? true : false}>
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

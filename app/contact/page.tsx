"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

type FormFields = {
  email: {
    value: string;
    error: string;
  };
  message: {
    value: string;
    error: string;
  };
};

const initValue: FormFields = {
  email: { value: "", error: "" },
  message: { value: "", error: "" },
};

export default function Contact() {
  const [formFields, setFormFields] = useState<FormFields>(initValue);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let hasError = false;
    const newFields = { ...formFields };

    if (!validateEmail(formFields.email.value)) {
      newFields.email.error = "Veuillez entrer une adresse email valide.";
      hasError = true;
    }

    if (formFields.message.value.length === 0) {
      newFields.message.error = "Le message ne peut pas être vide.";
      hasError = true;
    } else if (formFields.message.value.length > 300) {
      newFields.message.error =
        "Le message ne doit pas dépasser 300 caractères.";
      hasError = true;
    }

    if (hasError) {
      setFormFields(newFields);
      return;
    }

    setFormFields(initValue);
    toast.success("Demande de contact envoyée avec succès.");
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [id]: { value: value, error: "" },
    }));
  }
  return (
    <div className="flex flex-col size-full justify-start gap-8 p-4">
      <Card className="flex flex-col gap-4 p-4 rounded-md">
        <h1 className="text-2xl font-bold">Formulaire de contact</h1>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col w-1/3 gap-4"
        >
          <FieldGroup className="gap-4">
            <Field className="gap-2">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="votre_email@test.com"
                value={formFields.email.value}
                onChange={(event) => handleChange(event)}
              />
              {formFields.email.error && (
                <FieldError>{formFields.email.error}</FieldError>
              )}
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea
                id="message"
                value={formFields.message.value}
                onChange={(event) => handleChange(event)}
                rows={4}
                maxLength={300}
              />
              {formFields.message.error && (
                <FieldError>{formFields.message.error}</FieldError>
              )}
              <FieldDescription>
                {formFields.message.value.length}/300
              </FieldDescription>
            </Field>
          </FieldGroup>
          <Button type="submit">Envoyer</Button>
        </form>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/schemas";
import { signup } from "@/actions/auth";
import FormField from "./form-field";

export default function SignupForm() {
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupSchema) });

  async function onSubmit(values) {
    setFormError("");
    const result = await signup(values);
    if (result?.fieldErrors) {
      for (const [name, msgs] of Object.entries(result.fieldErrors)) {
        setError(name, { message: msgs[0] });
      }
    } else if (result?.message) {
      setFormError(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField label="Name" id="name" error={errors.name?.message}>
        <input id="name" autoComplete="name" {...register("name")} />
      </FormField>
      <FormField label="Email" id="email" error={errors.email?.message}>
        <input id="email" type="email" autoComplete="email" {...register("email")} />
      </FormField>
      <FormField label="Password" id="password" error={errors.password?.message}>
        <input id="password" type="password" autoComplete="new-password" {...register("password")} />
      </FormField>
      <FormField label="Confirm password" id="confirmPassword" error={errors.confirmPassword?.message}>
        <input id="confirmPassword" type="password" autoComplete="new-password" {...register("confirmPassword")} />
      </FormField>
      {formError ? <p className="field-error" role="alert">{formError}</p> : null}
      <button className="btn btn-red btn-block" disabled={isSubmitting}>
        {isSubmitting ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}

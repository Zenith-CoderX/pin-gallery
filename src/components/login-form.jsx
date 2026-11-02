"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";
import { login } from "@/actions/auth";
import FormField from "./form-field";

export default function LoginForm({ callbackUrl }) {
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values) {
    setFormError("");
    const result = await login(values, callbackUrl);
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
      <FormField label="Email" id="email" error={errors.email?.message}>
        <input id="email" type="email" autoComplete="email" {...register("email")} />
      </FormField>
      <FormField label="Password" id="password" error={errors.password?.message}>
        <input id="password" type="password" autoComplete="current-password" {...register("password")} />
      </FormField>
      {formError ? <p className="field-error" role="alert">{formError}</p> : null}
      <button className="btn btn-red btn-block" disabled={isSubmitting}>
        {isSubmitting ? "Logging in…" : "Log in"}
      </button>
    </form>
  );
}

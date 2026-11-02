import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
    email: z.email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-zA-Z]/, "Include at least one letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const uploadSchema = z.object({
  title: z.string().trim().max(120, "Title is too long"),
  file: z
    .instanceof(File, { message: "Choose an image" })
    .refine((f) => f.size > 0, "Choose an image")
    .refine((f) => f.size <= 5 * 1024 * 1024, "Image must be 5 MB or smaller")
    .refine(
      (f) => ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(f.type),
      "Only JPG, PNG, WebP or GIF images"
    ),
});

import { z } from "zod";

export const userFormSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .regex(/^[a-zA-Z ,.'-]+$/, "Name can only contain letters, spaces, and hyphens")
    .min(3, "Name must be at least 3 characters long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long"),
  email: z
    .email()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
  address: z.object({
    street: z
      .string()
      .min(3, "Street must be at least 3 characters long"),
    suite: z
      .string()
      .min(3, "Suite must be at least 3 characters long"),
    city: z
      .string()
      .min(3, "City must be at least 3 characters long"),
    zipcode: z
      .string()
      .min(3, "Zipcode must be at least 3 characters long"),
  }),
  phone: z
    .string()
    .regex(/^[0-9()-]*$/, "Phone can only contain numbers, parentheses, and hyphens")
    .min(7, "Phone must be at least 7 characters long"),
  company: z.object({
    name: z
      .string()
      .regex(/^[a-zA-Z ,.'-]+$/, "Company name can only contain letters, spaces, and hyphens")
      .min(3, "Company name must be at least 3 characters long"),
    catchPhrase: z
      .string()
      .min(3, "Catch phrase must be at least 3 characters long"),
    bs: z
      .string()
      .min(3, "BS must be at least 3 characters long"),
  }),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
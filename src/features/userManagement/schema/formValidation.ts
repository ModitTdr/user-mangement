import { z } from "zod";

export const userFormSchema = z.object({
  id: z.string().optional(),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters long"),

  email: z.email("Invalid email address"),

  phone: z
    .string()
    .regex(/^[0-9]+$/, "Phone must contain only numbers")
    .min(10, "Phone must be at least 10 digits"),

  role: z.enum(["ADMIN", "USER"]),
  status: z.enum(["active", "inactive", "pending", "banned"]),

  createdAt: z
    .string()
    .optional(),

  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long"),

  gender: z.enum(["male", "female", "other"]),

  dateOfBirth: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),

  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters long"),

  maritalStatus: z.enum(["single", "married", "divorced", "widowed"]),

  address: z
    .string()
    .min(3, "Address must be at least 3 characters long"),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
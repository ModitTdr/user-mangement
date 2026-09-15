import z, { email } from "zod";

export const RegisterSchema = z.object({
  email: email(),
  username: z
    .string()
    .min(2, 'Username should be minimum 2 digits'),
  password: z
    .string()
    .min(8, 'Password should be minimum 8 digits')
    .max(20, 'Password should be maximum 20 digits')
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password should have atleat one capital letter, number and special character'),
})

export type RegisterValues = z.infer<typeof RegisterSchema>;

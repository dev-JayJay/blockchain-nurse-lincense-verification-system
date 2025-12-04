import { z } from "zod";

export const step1Schema = z.object({
  orgName: z.string().min(1, "Organization name is required"),
  orgType: z.string().min(1, "Organization type is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(1, "Phone is required"),
  website: z.string().optional(),
  cacNumber: z.string().min(1, "CAC number is required"),
  tin: z.string().min(1, "TIN is required"),
});


export const step2Schema = z
  .object({
    repFirstName: z.string().min(1, "Rep first name required"),
    repMiddleName: z.string().optional(),
    repLastName: z.string().min(1, "Rep last name required"),
    repTitle: z.string().optional(),
    repAddress: z.string().min(1, "Rep address required"),
    repEmail: z.string().email("Invalid rep email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password cannot exceed 20 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

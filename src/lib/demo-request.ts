import { z } from "zod";

export const DEMO_ROLES = [
  { value: "teacher", label: "Teacher" },
  { value: "head", label: "Head / Principal" },
  { value: "admin", label: "School administrator" },
  { value: "other", label: "Other" },
] as const;

const PHONE_PATTERN = /^[0-9+()\s-]{6,30}$/;

export const demoRequestSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address.").max(255),
  phone: z.string().trim().regex(PHONE_PATTERN, "Please enter a valid phone or WhatsApp number."),
  school_name: z.string().trim().min(2, "Please enter your school's name.").max(150),
  role: z.enum(["teacher", "head", "admin", "other"], { message: "Please choose your role." }),
  country: z.string().trim().min(2, "Please enter your country.").max(60),
  message: z
    .string()
    .trim()
    .max(1000, "Please keep your message under 1000 characters.")
    .optional()
    .transform((m) => (m ? m : undefined)),
  // Honeypot: hidden from people, filled in by bots.
  company_website: z.string().max(0).optional(),
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;

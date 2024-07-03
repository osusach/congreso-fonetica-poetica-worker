import { z } from 'zod'
export const speakerRequestSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  institution: z.string(),
  authors: z.string(),
  country: z.string(),
  hosts: z.string(),
  title: z.string(),
  lang: z.coerce.number().min(1).max(3).int(),
  keywords: z.string(),
  theme: z.string(),
  abstract: z.string(),
  bibliography: z.string(),
  raw_file: z.any(),
  encoded_file: z.string()
});

export type speakerRequest = z.infer<typeof speakerRequestSchema>

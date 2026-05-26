// lib/validations.ts
import { z } from 'zod'

const phone = z.string().min(7, 'Enter a valid phone number').max(20)
const name  = z.string().min(1, 'Required').max(80)

export const loanInquirySchema = z.object({
  firstName:       name,
  lastName:        name,
  email:           z.string().email('Enter a valid email'),
  phone,
  loanType:        z.enum(['GROUND_UP','FIX_AND_FLIP','DSCR_RENTAL','BRIDGE_LOAN']),
  propertyAddress: z.string().max(200).optional(),
  loanAmount:      z.string().min(1, 'Required'),
  experience:      z.string().optional(),
  notes:           z.string().max(2000).optional(),
})

export const brokerRegistrationSchema = z.object({
  firstName:    name,
  lastName:     name,
  email:        z.string().email('Enter a valid email'),
  phone,
  company:      z.string().min(1, 'Required').max(120),
  nmlsId:       z.string().max(20).optional(),
  states:       z.string().min(1, 'Enter at least one state'),
  monthlyVolume: z.string().optional(),
  products:     z.array(z.string()).min(1, 'Select at least one product'),
  notes:        z.string().max(2000).optional(),
})

export const contactSchema = z.object({
  firstName: name,
  lastName:  name,
  company:   z.string().max(120).optional(),
  phone,
  email:     z.string().email('Enter a valid email'),
  message:   z.string().min(10, 'Please enter a message').max(3000),
})

export const jobApplicationSchema = z.object({
  firstName:  name,
  lastName:   name,
  email:      z.string().email('Enter a valid email'),
  phone:      z.string().max(20).optional(),
  position:   z.string().min(1, 'Required'),
  aboutText:  z.string().max(3000).optional(),
  resumeUrl:  z.string().url('Must be a valid URL').optional(),
  resumeName: z.string().max(255).optional(),
}).refine((data) => {
  // If resumeName is provided, resumeUrl should also be provided
  if (data.resumeName && !data.resumeUrl) {
    return false;
  }
  // If resumeUrl is provided, resumeName should also be provided
  if (data.resumeUrl && !data.resumeName) {
    return false;
  }
  return true;
}, {
  message: "Resume name and URL must both be provided or both be omitted",
  path: ["resumeName"], // or ["resumeUrl"] - either works
})

export type LoanInquiryInput        = z.infer<typeof loanInquirySchema>
export type BrokerRegistrationInput = z.infer<typeof brokerRegistrationSchema>
export type ContactInput            = z.infer<typeof contactSchema>
export type JobApplicationInput     = z.infer<typeof jobApplicationSchema>
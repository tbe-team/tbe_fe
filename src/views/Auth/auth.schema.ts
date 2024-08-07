import { NAME_REGEX, PASSWORD_REGEX } from '@/constants/regex'
import * as z from 'zod'

const LoginSChema = z.object({
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      'Password must be 8-20 characters, include a number and a special character'
    )
})

const RegisterSchema = LoginSChema.extend({
  first_name: z
    .string()
    .min(1, 'First name is required')
    .max(20, 'Max 20 characters')
    .regex(NAME_REGEX, 'Only letters allowed'),
  last_name: z
    .string()
    .min(1, 'Last name is required')
    .max(20, 'Max 20 characters')
    .regex(NAME_REGEX, 'Only letters allowed')
})

export { LoginSChema, RegisterSchema }

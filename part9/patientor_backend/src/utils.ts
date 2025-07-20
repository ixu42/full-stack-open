import { z } from 'zod';
import { Gender, NewPatient } from './types';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(z.any())
});

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

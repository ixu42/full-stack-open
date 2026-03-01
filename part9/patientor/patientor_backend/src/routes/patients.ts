import express, { Response } from 'express';
import { NonSensitivePatient } from '../types';
import patientService from '../services/patientService';

const router = express.Router();

// fetch all diagnoses
router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  console.log('someone pinged /api/patients');
  res.send(patientService.getNonSensitivePatients());
});

export default router;

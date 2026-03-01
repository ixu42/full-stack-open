import express, { Response } from 'express';
import { Diagnosis } from '../types';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

// fetch all diagnoses
router.get('/', (_req, res: Response<Diagnosis[]>) => {
  console.log('someone pinged /api/diagnoses');
  res.send(diagnosisService.getDiagnoses());
});

export default router;

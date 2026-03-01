import { v4 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (newPatient: NewPatient): Patient => {
  const newRecord: Patient = {
    id: uuid(),
    ...newPatient
  };
  patients.push(newRecord);
  return newRecord;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};

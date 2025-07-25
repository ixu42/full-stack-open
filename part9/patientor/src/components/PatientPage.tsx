import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Patient, Diagnosis } from '../types';
import patientService from '../services/patients';

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        setError('Invalid patient id');
        setLoading(false);
        return;
      }
      try {
        const fetchedPatient = await patientService.getOne(id);
        setPatient(fetchedPatient);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data?.error || 'Failed to fetch patient data');
        } else {
          setError('Unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    void fetchPatient();
  }, [id]);

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      default:
        return <HelpOutlineIcon />;
    }
  };

  if (loading) return <div style={{ marginTop: 20 }}>Loading...</div>;
  if (error) return <div style={{ marginTop: 20 }}>{error}</div>;
  if (!patient) return null;

  return (
    <div>
      <h2>
        {patient.name} {getGenderIcon(patient.gender)}
      </h2>
      <div>
        <p style={{ margin: 0 }}>ssn: {patient.ssn}</p>
        <p style={{ margin: 0 }}>occupation: {patient.occupation}</p>
      </div>
      <h3>entries</h3>
      <div>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            <div>
              {entry.date} {entry.description}
            </div>
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <ul>
                {entry.diagnosisCodes.map((code) => {
                  const diagnosis: Diagnosis | undefined = diagnoses.find(
                    (d: Diagnosis) => d.code === code
                  );
                  return (
                    <li key={code}>
                      {code} {diagnosis ? diagnosis.name : ''}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPage;

import React from 'react';
import { Entry } from '../types';
import HospitalEntryDetails from './EntryTypes/HospitalEntryDetails';
import OccupationalHealthcareEntryDetails from './EntryTypes/OccupationalHealthcareEntryDetails';
import HealthCheckEntryDetails from './EntryTypes/HealthCheckEntryDetails';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default EntryDetails;

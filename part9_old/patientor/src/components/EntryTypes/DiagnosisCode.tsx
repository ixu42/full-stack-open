const DiagnosisCode = ({ code }: { code: string }) => {
  return {
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
  };
};

export default DiagnosisCode;
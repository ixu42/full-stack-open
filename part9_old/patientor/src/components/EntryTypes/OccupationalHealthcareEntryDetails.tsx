import { Card, CardContent } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import { OccupationalHealthcareEntry } from '../../types';

const OccupationalHealthcareEntryDetails = ({
  entry
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Card>
      <CardContent>
        <div>
          {entry.date} <WorkIcon /> {entry.employerName}
        </div>
        <div>
          <i>{entry.description}</i>
        </div>
        <div>diagnosed by {entry.specialist}</div>
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcareEntryDetails;

import { Card, CardContent } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { HospitalEntry } from '../../types';

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Card>
      <CardContent>
        <div>
          {entry.date} <LocalHospitalIcon />
        </div>
        <div>
          <i>{entry.description}</i>
        </div>
        <div>diagnosed by {entry.specialist}</div>
      </CardContent>
    </Card>
  );
};

export default HospitalEntryDetails;

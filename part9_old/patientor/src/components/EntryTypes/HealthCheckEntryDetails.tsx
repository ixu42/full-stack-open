import { Card, CardContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { HealthCheckEntry, HealthCheckRating } from '../../types';

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const getHeartColor = (rating: number) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return 'green';
      case HealthCheckRating.LowRisk:
        return 'yellow';
      case HealthCheckRating.HighRisk:
        return 'orange';
      case HealthCheckRating.CriticalRisk:
        return 'red';
      default:
        return 'grey';
    }
  };

  return (
    <Card>
      <CardContent>
        <div>
          {entry.date} <MedicalServicesIcon />
        </div>
        <div>
          <i>{entry.description}</i>
        </div>
        <FavoriteIcon
          style={{ color: getHeartColor(entry.healthCheckRating) }}
        />
        <div>diagnosed by {entry.specialist}</div>
      </CardContent>
    </Card>
  );
};

export default HealthCheckEntryDetails;

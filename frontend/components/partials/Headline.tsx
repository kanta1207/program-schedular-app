import Typography from '@mui/material/Typography';

interface HeadlineProps {
  name: string;
}

const Headline: React.FC<HeadlineProps> = ({ name }) => {
  return (
    <Typography variant="h4" color="primary.main" fontWeight={500} letterSpacing={0.25}>
      {name}
    </Typography>
  );
};

export default Headline;

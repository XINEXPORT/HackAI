import { Link } from 'react-router';
import { Button, Typography } from '@mui/material';
import { FullSizeCentered } from '@/components/styled';

function Settings() {
  return (
    <>
      <meta name="title" content="Settings" />
      <FullSizeCentered>
        <Typography variant="h3">Settings</Typography>
        <Button
          to={`/${Math.random().toString()}`}
          component={Link}
          variant="outlined"
          sx={{ mt: 4 }}
          size="small"
          color="warning"
        >
          Want to check 404?
        </Button>
      </FullSizeCentered>
    </>
  );
}

export default Settings;

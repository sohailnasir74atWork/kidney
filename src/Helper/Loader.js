import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularColor() {
  return (
    <Stack 
      sx={{
        color: 'grey.500',
        height: '100vh', // Ensures full viewport height
        width: '100vw', // Ensures full viewport width
        justifyContent: 'center', // Centers horizontally
        alignItems: 'center' // Centers vertically
      }}
      spacing={2}
      direction="row"
    >
      <CircularProgress color="secondary" />
    </Stack>
  );
}

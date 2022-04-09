import { Typography } from '@mui/material';
import * as React from 'react';

export const Copyright = (props: any) => {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {`Copyright © ${new Date().getFullYear()}, (TNPW2/OWE) project Šimon Slabý.`}
    </Typography>
  );
};

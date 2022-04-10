import { Button, Typography } from '@mui/material';
import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useLocation } from 'wouter';

export const Backlink: React.FunctionComponent<{ link: string; customText?: string }> = ({ link, customText }) => {
  const [, setLocation] = useLocation();
  return (
    <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => {
      setLocation(link);
    }}>
      {customText ? <Typography ml={2}>{customText}</Typography> : 'Go back'}
    </Button>
  );
};

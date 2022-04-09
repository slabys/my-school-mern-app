import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useLocation } from 'wouter';

export const PostModal: React.FunctionComponent = () => {
  const [,setLocation] = useLocation()

  return (
    <Dialog maxWidth='sm' fullWidth open scroll='body' onClose={() => {
      setLocation('/');
    }}>
      <DialogTitle>
        <IconButton sx={{ position: 'absolute', top: '8px', right: '8px' }} onClick={() => {
          setLocation('/');
        }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography>Modal</Typography>
      </DialogContent>
    </Dialog>
  );
};

import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

export const CreatePostModal: React.FunctionComponent = () => {
  // const [,setLocation] = useLocation()
  const [displayModal, setDisplayModal] = React.useState(false);

  console.log(displayModal)

  return (
    <Dialog maxWidth='sm' fullWidth open scroll='body' onClose={() => {
      setDisplayModal(false);
    }}>
      <DialogTitle>
        <IconButton sx={{ position: 'absolute', top: '8px', right: '8px' }} onClick={() => {
          setDisplayModal(false);
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

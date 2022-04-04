import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import * as React from 'react';

export const SignUpModals: React.FunctionComponent<{ modal: React.ReactElement; onCloseModal: (value: string) => void }> =
  ({
     modal,
     onCloseModal,
   }) => {
    return (
      <Dialog maxWidth='sm' fullWidth open scroll='body' onClose={() => {
        onCloseModal('/');
      }}>
        <DialogTitle>
          <IconButton sx={{ position: 'absolute', top: '8px', right: '8px' }} onClick={() => {
            onCloseModal('/');
          }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {modal}
        </DialogContent>
      </Dialog>
    );
  };

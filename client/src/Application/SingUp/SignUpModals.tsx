import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Login } from 'Application/SingUp';
import { Register } from 'Application/SingUp/Register';
import * as React from 'react';

export const SignUpModals: React.FunctionComponent<{location: string; onCloseModal: (value: string) => void}> = ({ location, onCloseModal }) => {
  return(
    <>
      {location === '/login' ? (
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
            <Login />
          </DialogContent>
        </Dialog>
      ) : (location === '/register' ? (
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
            <Register />
          </DialogContent>
        </Dialog>
      ) : null)}
    </>
  )
}

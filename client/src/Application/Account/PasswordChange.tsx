import React from 'react';
import { useDispatch } from 'react-redux';
import { updateUserPassword } from 'actions/signUp';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useLocation } from 'wouter';

interface PasswordChangeValues {
  currentPassword: string,
  newPassword: string,
  repeatPassword: string,
}

const PasswordChangeInit: PasswordChangeValues = {
  currentPassword: '',
  newPassword: '',
  repeatPassword: '',
};

export const PasswordChange: React.FunctionComponent = () => {
  const [, setLocation] = useLocation();
  const dispatch = useDispatch();

  const handleSubmit = (values: PasswordChangeValues) => {
    dispatch(updateUserPassword(JSON.parse(localStorage.getItem('profile') as string)?.result._id, {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
        setLocation,
      ),
    );
  };

  const validationSchema = () => Yup.object({
    currentPassword: Yup.string().required('Password is required'),
    newPassword: Yup.string().min(4).required('New password is required'),
    repeatPassword: Yup.string().min(4).required('Repeat password').when('newPassword', {
      is: (value: string) => (value && value.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('newPassword')],
        `Passwords doesn't match`,
      ),
    }),
  });

  return (
    <Formik
      initialValues={PasswordChangeInit}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleChange }) => (
        <Form style={{ width: '100%' }}>
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item display='flex' alignItems='center' xs={12} sm={12} md={4}>
                <Typography paragraph={false}>Current password:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <TextField
                  fullWidth
                  value={values.currentPassword}
                  onChange={handleChange}
                  type='password'
                  id='currentPassword'
                  name='currentPassword'
                  label={'Current Password'}
                />
                <ErrorMessage name='currentPassword'
                              render={error => <Typography sx={{ color: 'red' }}>{error}</Typography>} />
              </Grid>
              <Grid item display='flex' alignItems='center' xs={12} sm={12} md={4}>
                <Typography paragraph={false}>New Password:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <TextField
                  fullWidth
                  value={values.newPassword}
                  onChange={handleChange}
                  type='password'
                  id='newPassword'
                  name='newPassword'
                  label={'New Password'}
                />
                <ErrorMessage name='newPassword'
                              render={error => <Typography sx={{ color: 'red' }}>{error}</Typography>} />
              </Grid>
              <Grid item display='flex' alignItems='center' xs={12} sm={12} md={4}>
                <Typography paragraph={false}>Repeat new password:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <TextField
                  fullWidth
                  value={values.repeatPassword}
                  onChange={handleChange}
                  type='password'
                  id='repeatPassword'
                  name='repeatPassword'
                  label={'Repeat password'}
                />
                <ErrorMessage name='repeatPassword'
                              render={error => <Typography sx={{ color: 'red' }}>{error}</Typography>} />
              </Grid>
            </Grid>
          </Stack>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Update your password
          </Button>
        </Form>
      )}
    </Formik>
  );
};

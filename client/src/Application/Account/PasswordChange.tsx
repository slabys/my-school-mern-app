import React from 'react';
import { useSelector } from 'react-redux';
import { IRootSelector } from 'reducers';
// import { updateUserPassword } from 'actions/signUp';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';

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

  // const dispatch = useDispatch();
  const userInfo = useSelector((store: IRootSelector) => store.signUp);

  console.log(userInfo)

  const handleSubmit = (values: PasswordChangeValues) => {
    console.log('send')
    console.log(userInfo._id, {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    })
    // dispatch(updateUserPassword(userInfo._id, {
    //   currentPassword: values.currentPassword,
    //   newPassword: values.newPassword,
    // }));
  };

  const validationSchema = () => Yup.object({
    currentPassword: Yup.string().required('Password is required'),
    newPassword: Yup.string().min(4).required('New password is required'),
    repeatPassword: Yup.string().min(4).required('Repeat password').when('password', {
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
                  id='currentPassword'
                  name='currentPassword'
                  label={'Current Password'}
                />
              </Grid>
              <Grid item display='flex' alignItems='center' xs={12} sm={12} md={4}>
                <Typography paragraph={false}>New Password:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <TextField
                  fullWidth
                  value={values.newPassword}
                  onChange={handleChange}
                  id='newPassword'
                  name='newPassword'
                  label={'New Password'}
                />
              </Grid>
              <Grid item display='flex' alignItems='center' xs={12} sm={12} md={4}>
                <Typography paragraph={false}>Repeat new password:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <TextField
                  fullWidth
                  value={values.repeatPassword}
                  onChange={handleChange}
                  id='repeatPassword'
                  name='repeatPassword'
                  label={'Repeat password'}
                />
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

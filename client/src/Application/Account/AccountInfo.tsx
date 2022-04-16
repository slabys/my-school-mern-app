import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootSelector, UserDataResult } from 'reducers';
import { updateUserInfo } from 'actions/signUp';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';

interface AccountValues {
  _id: string,
  email: string,
  nickname: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  city: string,
  street: string,
}

const accountValuesInit: AccountValues = {
  _id: '',
  email: '',
  nickname: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  city: '',
  street: '',
};

export const AccountInfo: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState<UserDataResult | null>(null);
  const { authData } = useSelector((store: IRootSelector) => store.signUp);
  const userInfoData = { ...accountValuesInit, ...user };

  const handleSubmit = (values: AccountValues) => {
    dispatch(updateUserInfo(values._id, { ...values }));
  };

  React.useEffect(() => {
    if(authData) setUser(authData.result)
  },[authData, dispatch])

  const validationSchema = () => Yup.object({
    firstName: Yup.string().trim(),
    lastName: Yup.string().trim(),
    phoneNumber: Yup.string().trim(),
    city: Yup.string().trim(),
    street: Yup.string().trim(),
  });

  return (
    <Formik
      initialValues={userInfoData}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({ values, handleChange }) => (
        <Form style={{ width: '100%' }}>
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item display='flex' alignItems='center' xs={12} md={3}>
                <Typography paragraph={false}>User email:</Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  fullWidth
                  disabled
                  value={values.email}
                />
              </Grid>
              <Grid item display='flex' alignItems='center' xs={12} md={3}>
                <Typography paragraph={false}>User nickname:</Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  fullWidth
                  disabled
                  value={values.nickname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={values.firstName}
                  onChange={handleChange}
                  id='firstName'
                  name='firstName'
                  label={'First name'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={values.lastName}
                  onChange={handleChange}
                  id='lastName'
                  name='lastName'
                  label={'Last name'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={values.city}
                  onChange={handleChange}
                  id='city'
                  name='city'
                  label={'City'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={values.street}
                  onChange={handleChange}
                  id='street'
                  name='street'
                  label={'Street'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={values.phoneNumber}
                  onChange={handleChange}
                  id='phoneNumber'
                  name='phoneNumber'
                  label={'Phone Number'}
                />
              </Grid>
            </Grid>
          </Stack>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Update your personal data
          </Button>
        </Form>
      )}
    </Formik>
  );
};

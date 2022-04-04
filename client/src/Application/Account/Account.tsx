import React, { Dispatch, SetStateAction } from 'react';
import { Box, Button, Container, Grid, Stack, styled, TextField, Typography } from '@mui/material';
import { ContentWithSidebar, SideMenuItem } from 'ContentWithSidebar';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { IRootSelector } from 'reducers';

const Row = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  display: 'flex',
  justifyContent: 'flex-stretch',
}));

export const Account: React.FunctionComponent = () => {
  const [content, setContent] = React.useState('');
  const Content = () => {
    switch (content) {
      case 'Account':
        return <AccountContent />;
      case 'Password':
        return <PasswordContent />;
      default:
        return <AccountContent />;
    }
  };
  return (
    <Container maxWidth='md'>
      <Row container spacing={2}>
        <ContentWithSidebar menu={<Menu setContent={setContent} />} content={<Content />} />
      </Row>
    </Container>
  );
};

const Menu: React.FunctionComponent<{ setContent: Dispatch<SetStateAction<string>>; }> = ({ setContent }) => {

  return (
    <Box display='flex' justifyContent='center' flexDirection='column'>
      <SideMenuItem onContextChange={setContent} text='Account' />
      <SideMenuItem onContextChange={setContent} text='Password' />
    </Box>

  );
};

interface AccountValues {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  city: string,
  street: string,
}

const accountValuesInit: AccountValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  city: '',
  street: '',
};

const AccountContent: React.FunctionComponent = () => {
  const userData = useSelector((store: IRootSelector) => store.signUp)
  const handleSubmit = (values: AccountValues) => {
    console.log(values);
  };

  const validationSchema = () => Yup.object({
    firstName: Yup.string().trim(),
    lastName: Yup.string().trim(),
    phoneNumber: Yup.string().trim(),
    city: Yup.string().trim(),
    street: Yup.string().trim(),
  });

  return (
    <Formik
      initialValues={{ ...accountValuesInit }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
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
                  value={userData.email}
                />
              </Grid>
              <Grid item display='flex' alignItems='center' xs={12} md={3}>
                <Typography paragraph={false}>User nickname:</Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  fullWidth
                  disabled
                  value={userData.nickname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={values.firstName}
                  onChange={handleChange}
                  id='firstName'
                  name='firstName'
                  label={userData.firstName ?? 'First name'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={values.lastName}
                  onChange={handleChange}
                  id='lastName'
                  name='lastName'
                  label={userData.lastName ?? 'Last name'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={values.city}
                  onChange={handleChange}
                  id='city'
                  name='city'
                  label={userData.City ?? 'City'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={values.street}
                  onChange={handleChange}
                  id='street'
                  name='street'
                  label={userData.Street ?? 'Street'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={values.phoneNumber}
                  onChange={handleChange}
                  id='phoneNumber'
                  name='phoneNumber'
                  label={userData.phoneNumber ?? 'Phone Number'}
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

const PasswordContent: React.FunctionComponent = () => {
  return (
    <Typography>Password Content</Typography>
  );
};

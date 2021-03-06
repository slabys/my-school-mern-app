import * as React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Link,
  Container,
  TextField,
  Button,
} from '@mui/material';
import { AppRegistrationOutlined } from '@mui/icons-material';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Copyright } from 'Application';
import { useDispatch } from 'react-redux';
import { registerUser } from 'actions/signUp';
import { useLocation } from 'wouter';

interface RegisterValues {
  firstName: string,
  lastName: string,
  nickname: string,
  email: string,
  password: string,
}

const RegisterInitValues: RegisterValues = {
  firstName: '',
  lastName: '',
  nickname: '',
  email: '',
  password: '',
};

export const Register: React.FunctionComponent = () => {
  const [, setLocation] = useLocation();
  const dispatch = useDispatch();

  const handleSubmit = (values: RegisterValues) => {
    dispatch(registerUser(values, setLocation));
  };

  const validationSchema = () => Yup.object({
    firstName: Yup.string().trim(),
    lastName: Yup.string().trim(),
    nickname: Yup.string().trim(),
    email: Yup.string().trim().email('Email must be valid').required('Email is required'),
    password: Yup.string().min(4).required('Password is required'),
    passwordRepeat: Yup.string().min(4).required('Repeat password').when('password', {
      is: (value: string) => (value && value.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        `Passwords doesn't match`,
      ),
    }),
  });

  return (
    <Container maxWidth='xs'>
      <Box
        pt={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: '4',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AppRegistrationOutlined />
        </Avatar>
        <Typography component='h1' variant='h5' color='text.primary'>
          Registration
        </Typography>
        <Formik
          initialValues={
            {
              ...RegisterInitValues,
              passwordRepeat: '',
            }
          }
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange }) => (
            <Form style={{ width: '100%' }}>
              <Box display='flex' flexDirection='row'>
                <TextField
                  value={values.firstName}
                  onChange={handleChange}
                  sx={{ marginRight: 1 }}
                  margin='normal'
                  id='firstName'
                  label='First name'
                  name='firstName'
                />
                <TextField
                  value={values.lastName}
                  onChange={handleChange}
                  sx={{ marginLeft: 1 }}
                  margin='normal'
                  id='lastName'
                  label='Last name'
                  name='lastName' />
              </Box>
              <TextField
                value={values.nickname}
                onChange={handleChange}
                fullWidth margin='normal'
                id='nickname'
                label='Nickname'
                name='nickname'
              />
              <ErrorMessage name='nickname' render={error => <Typography sx={{ color: 'red' }}>{error}</Typography>} />
              <TextField
                value={values.email}
                onChange={handleChange}
                fullWidth
                margin='normal'
                id='email'
                label='Email'
                name='email'
              />
              <ErrorMessage name='email' render={error => <Typography sx={{ color: 'red' }}>{error}</Typography>} />
              <Box display='flex' flexDirection='row'>
                <Box display='flex' flexDirection='column'>
                  <TextField
                    value={values.password}
                    onChange={handleChange}
                    sx={{ marginRight: 1 }}
                    margin='normal'
                    fullWidth id='password'
                    name='password'
                    label='Password'
                    type='password'
                  />
                  <ErrorMessage name='password'
                                render={error => <Typography sx={{ color: 'red' }}>{error}</Typography>} />
                </Box>
                <Box display='flex' flexDirection='column'>
                  <TextField
                    value={values.passwordRepeat}
                    onChange={handleChange}
                    sx={{ marginLeft: 1 }}
                    margin='normal'
                    fullWidth id='passwordRepeat'
                    name='passwordRepeat'
                    label='Repeat password'
                    type='password'
                  />
                  <ErrorMessage name='passwordRepeat'
                                render={error => <Typography sx={{ color: 'red' }}>{error}</Typography>} />
                </Box>
              </Box>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
        <Link href='/login' variant='body2'>
          {'Do you have an account? Log In'}
        </Link>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

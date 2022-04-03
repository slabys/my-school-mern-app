import * as React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Link,
  Container,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { LoginOutlined } from '@mui/icons-material/';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Copyright } from 'Application';
import { loginUser } from 'actions/signUp';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'wouter';
import { IRootSelector } from 'reducers';

interface LoginValues {
  email: string,
  password: string
}

const LoginInitValues: LoginValues = {
  email: '',
  password: '',
};

export const Login: React.FunctionComponent = () => {
  const login = useSelector((store: IRootSelector) => store.signUp);
  const [, setLocation] = useLocation();
  const dispatch = useDispatch();
  const handleSubmit = (values: LoginValues) => {
    dispatch(loginUser(values, setLocation));
    console.log(login)
  };

  const validationSchema = () => Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
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
          <LoginOutlined />
        </Avatar>
        <Typography component='h1' variant='h5' color='text.primary'>
          Sign in
        </Typography>
        <Formik
          initialValues={LoginInitValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange }) => (
            <Form style={{ width: '100%' }}>
              <Box>
                <TextField
                  margin='normal'
                  fullWidth
                  id='email'
                  name='email'
                  label='Email Address'
                  autoComplete='email'
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name='email'
                  render={error => <Typography sx={{ color: 'red' }}>
                    {error}
                  </Typography>
                  }
                />
              </Box>
              <TextField
                margin='normal'
                fullWidth
                id='password'
                name='password'
                label='Password'
                type='password'
                autoComplete='current-password'
                value={values.password}
                onChange={handleChange}
              />
              <ErrorMessage name='email' render={
                error => <Typography sx={{ color: 'red' }}>{error}</Typography>
              } />
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
        <Grid container>
          <Grid item xs>
            <Link href='#' variant='body2' sx={{ textDecoration: 'line-through' }}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href='/register' variant='body2'>
              {'Don\'t have an account? Register'}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

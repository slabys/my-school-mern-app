import * as React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Link,
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
} from '@mui/material';
import { LoginOutlined } from '@mui/icons-material/';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';

interface LoginValues {
  email: string,
  password: string
}

const LoginInitValues: LoginValues = {
  email: '',
  password: '',
};

export const Login: React.FunctionComponent = () => {

  // const posts = useSelector((store: IRootSelector) => store.posts);

  const handleSubmit = (values: LoginValues) => {
    console.log({
      email: values.email,
      password: values.password,
    });
  };

  const validationSchema = () => Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'min 8')
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
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={validationSchema}
        >
          <Form style={{ width: '100%' }}>
            <Box>
              <TextField margin='normal' fullWidth id='email' label='Email Address' name='email'
                         autoComplete='email' autoFocus />
              <ErrorMessage name='email' render={
                error => <Typography sx={{ color: 'red' }}>{error}</Typography>
              } />
            </Box>
            <TextField margin='normal' fullWidth id='password' name='password' label='Password' type='password'
                       autoComplete='current-password' />
            <ErrorMessage name='email' render={
              error => <Typography sx={{ color: 'red' }}>{error}</Typography>
            } />
            <br />
            <FormControlLabel
              control={<Checkbox value='remember' />}
              label={<Typography sx={{ color: 'text.primary' }}>Remember me</Typography>} />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Form>
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

const Copyright = (props: any) => {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {`Copyright © ${new Date().getFullYear()}, TNPW2 project Šimon Slabý.`}
    </Typography>
  );
};

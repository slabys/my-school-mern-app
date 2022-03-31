import * as React from 'react';
import { Box, Avatar, Typography, Link, Container, TextField, FormControlLabel, Checkbox, Button, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSelector } from 'react-redux';
import { IRootSelector } from 'reducers';

export const Login: React.FunctionComponent = () => {

  const posts = useSelector((store: IRootSelector) => store.posts)

  console.log(posts)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField margin='normal' required fullWidth id='email' label='Email Address' name='email' autoComplete='email' autoFocus />
          <TextField margin='normal' required fullWidth name='password' label='Password' type='password' id='password' autoComplete='current-password' />
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2' sx={{ textDecoration: 'line-through'}}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2' sx={{ textDecoration: 'line-through'}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
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
}

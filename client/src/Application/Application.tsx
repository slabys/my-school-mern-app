import * as React from 'react';
import { Route, Switch, useLocation } from 'wouter';
import * as routes from 'Application/routes';
import { Landing } from 'Application/LandingPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPosts } from 'actions/posts';
import { Login, Register } from 'Application/SingUp';
import {
  Box,
  createTheme, CssBaseline, darkScrollbar, Dialog, DialogContent, DialogTitle, IconButton,
  ThemeProvider,
} from '@mui/material';
import { Close } from '@mui/icons-material/';
import { Navbar } from 'Application/Navbar';

export const Application: React.FunctionComponent = () => {
  return <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Layout>
      <RootRouter />
    </Layout>
  </ThemeProvider>;
};

const RootRouter: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Switch>
      <Route path={routes.LandingRoute.path}>
        <Landing />
      </Route>
      <Route path={routes.LandingRoute.path}>
        <></>
      </Route>
      <Route path={routes.LandingRoute.path}>
        <></>
      </Route>
    </Switch>
  );
};

const Layout: React.FunctionComponent<{
  children: React.ReactNode,
}> = ({ children }) => {
  const [location, setLocation] = useLocation();
  console.log(location);
  return (
    <Box height='100vh'>
      <Box flexGrow='1' sx={theme => ({
        height: 56,
        [theme.breakpoints.up('sm')]: {
          height: 64,
        },
      })} boxShadow={darkTheme.shadows[8]}>
        <Navbar setLocation={setLocation} />
      </Box>
      <Box sx={theme => ({
          backgroundColor: theme.palette.background.paper,
          minHeight: 'calc(100% - 56px)',
          [theme.breakpoints.up('sm')]: {
            minHeight: 'calc(100% - 64px)',
          },
        }
      )}>
        {children}
        {location === '/login' ? (
          <Dialog maxWidth='sm' fullWidth open scroll='body' onClose={() => {
            setLocation('/');
          }}>
            <DialogTitle>
              <IconButton sx={{ position: 'absolute', top: '8px', right: '8px' }} onClick={() => {
                setLocation('/');
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
            setLocation('/');
          }}>
            <DialogTitle>
              <IconButton sx={{ position: 'absolute', top: '8px', right: '8px' }} onClick={() => {
                setLocation('/');
              }}>
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Register />
            </DialogContent>
          </Dialog>
        ) : null)}
      </Box>
    </Box>
  );
};

const darkTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...darkScrollbar(),
        },
      },
    },
  },
  palette: {
    mode: 'dark',
  },
});

RootRouter.displayName = 'Application.RootRouter';

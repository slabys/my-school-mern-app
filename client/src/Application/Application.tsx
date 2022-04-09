import * as React from 'react';
import { Route, Switch, useLocation } from 'wouter';
import * as routes from 'Application/routes';
import { Login, Register, SignUpModals } from 'Application/SingUp';
import {
  Box,
  createTheme, CssBaseline, darkScrollbar,
  ThemeProvider,
} from '@mui/material';
import { Navbar } from 'Application/Navbar';
import { useDispatch } from 'react-redux';
import { getPosts } from 'actions';

export const Application: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  dispatch(getPosts());

  return <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Layout>
      <RootRouter />
    </Layout>
  </ThemeProvider>;
};

const RootRouter: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path={routes.AccountRoute.path} component={routes.AccountRoute.Target} />
      <Route path={routes.LandingRoute.path} component={routes.LandingRoute.Target} />
    </Switch>
  );
};

const Layout: React.FunctionComponent<{
  children: React.ReactNode,
}> = ({ children }) => {
  const [location, setLocation] = useLocation();
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
          py: 4,
          backgroundColor: theme.palette.background.paper,
          minHeight: 'calc(100% - 56px)',
          [theme.breakpoints.up('sm')]: {
            minHeight: 'calc(100% - 64px)',
          },
        }
      )}>
        {children}
        {location === ('/login')
          ? <SignUpModals modal={<Login />} onCloseModal={setLocation} />
          : location === ('/register')
            ? <SignUpModals modal={<Register />} onCloseModal={setLocation} />
            : null
        }
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

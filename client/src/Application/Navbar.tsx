import {
  AppBar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuProps,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  AppRegistrationOutlined,
  LoginOutlined,
  Logout,
  Menu as MenuIcon,
  Person,
  Settings,
} from '@mui/icons-material';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';


const SignUpMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    {...props}
  />
))(({ theme }) => ({
  mt: 1.5,
  [theme.breakpoints.down('sm')]: {
    width: '100vh',
    height: '100vh',
  },
}));

export const Navbar: React.FunctionComponent<{
  location: string,
  setLocation: (value: string) => void;
}> = ({ location, setLocation }) => {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('profile') as string));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  console.log(user);
  console.log(location);

  React.useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken: any = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile') as string));
  }, [location]);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setUser(null);
    setLocation('/');
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onOpenLoginDialog = () => {
    setLocation('/login');
  };
  const onOpenRegisterDialog = () => {
    setLocation('/register');
  };
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <IconButton onClick={handleClick}>
          <Person />
        </IconButton>
        <SignUpMenu
          open={open}
          id='menu'
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}>
          <MenuItem onClick={onOpenLoginDialog}>
            <LoginOutlined sx={{ marginRight: 1 }} /> Login
          </MenuItem>
          <MenuItem onClick={onOpenRegisterDialog}>
            <AppRegistrationOutlined sx={{ marginRight: 1 }} /> Register
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize='small' />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            Logout
          </MenuItem>
        </SignUpMenu>
      </Toolbar>
    </AppBar>
  );
};

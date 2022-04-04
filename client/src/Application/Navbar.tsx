import {
  AppBar, Avatar, Box,
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
} from '@mui/icons-material';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { logoutUser } from 'actions/signUp';


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
  const dispatch = useDispatch();

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

  const handleLogout = () => {
    dispatch(logoutUser(setUser, setLocation))

  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const stringAvatar = () => {
    return {
      children: ((user?.result?.firstName && user?.result?.lastName)
        ? `${user?.result?.firstName.charAt(0)}${user?.result?.lastName.charAt(0)}`
        : user?.result?.nickname.charAt(0))?.toUpperCase(),
    };
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
          BizarreBazaar
        </Typography>
        <IconButton onClick={handleClick}>
          <Avatar alt={user?.result?.nickname} {...stringAvatar()} />
        </IconButton>
        <SignUpMenu
          open={open}
          id='menu'
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}>
          {!user?.token
            ? (
              <Box>
                <MenuItem onClick={() => {
                  setLocation('/login')
                }}>
                  <LoginOutlined sx={{ marginRight: 1 }} /> Login
                </MenuItem>
                <MenuItem onClick={() => {
                  setLocation('/register')
                }}>
                  <AppRegistrationOutlined sx={{ marginRight: 1 }} /> Register
                </MenuItem>
                <Divider />
              </Box>
            )
            : (
              <Box>
                <MenuItem onClick={() => {
                  setLocation('/account')
                }}>
                  <ListItemIcon>
                    <Person fontSize='small' />
                  </ListItemIcon>
                  Account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize='small' />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Box>
            )
          }

        </SignUpMenu>
      </Toolbar>
    </AppBar>
  );
};

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
  AddBox,
  AppRegistrationOutlined,
  LoginOutlined,
  Logout,
  Person,
} from '@mui/icons-material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser, logoutUser } from 'actions/signUp';
import { Link } from 'wouter';
import { IRootSelector, UserData } from 'reducers';
import { getCookie } from 'utils/utils';

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
  setLocation: (value: string) => void;
}> = ({ setLocation }) => {
  const { authData } = useSelector((store: IRootSelector) => store.signUp);
  const [user, setUser] = React.useState<UserData | null>(authData);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (authData) setUser(authData);
    if(getCookie('profile')) dispatch(getLoggedInUser(JSON.parse(getCookie('profile') as string).result._id));
  }, [authData]);

  const handleLogout = () => {
    dispatch(logoutUser(setLocation));
    setUser(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Link to='/'>
          <Typography variant='h6' component='div' sx={{ cursor: 'pointer', flexGrow: 1 }}>
            BizarreBazaar
          </Typography>
        </Link>
        <IconButton onClick={handleClick}>
          <Avatar>
            {user !== null ? user?.result.nickname.charAt(0).toUpperCase() ?? user?.result.email.charAt(0).toUpperCase() : <Avatar/>}
          </Avatar>
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
                  setLocation('/login');
                }}>
                  <LoginOutlined sx={{ marginRight: 1 }} /> Login
                </MenuItem>
                <MenuItem onClick={() => {
                  setLocation('/register');
                }}>
                  <AppRegistrationOutlined sx={{ marginRight: 1 }} /> Register
                </MenuItem>
                <Divider />
              </Box>
            )
            : (
              <Box>
                <MenuItem onClick={() => {
                  // TODO openCreatePostModal();
                }}>
                  <ListItemIcon>
                    <AddBox fontSize='small' />
                  </ListItemIcon>
                  Add post
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                  setLocation('/account');
                }}>
                  <ListItemIcon>
                    <Person fontSize='small' />
                  </ListItemIcon>
                  Account
                </MenuItem>
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

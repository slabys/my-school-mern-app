import React from 'react';
import { Box, Container, Grid, styled } from '@mui/material';
import { ContentWithSidebar, SideMenuItem } from 'ContentWithSidebar';
import { AccountInfo, PasswordChange } from 'Application/Account';
import { Backlink } from 'Logic/Backlink';

const Row = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  display: 'flex',
  justifyContent: 'flex-stretch',
}));

export const Account: React.FunctionComponent = () => {
  const [activeContent, setActiveContent] = React.useState('account');

  const changeActiveMenu = (value: string) => {
    setActiveContent(value.toLocaleLowerCase());
  };

  return (
    <Container maxWidth='md'>
      <Row container spacing={2}>
        <Grid item xs={12}>
          <Backlink link={'/'} />
        </Grid>
        <ContentWithSidebar>
          <Box>
            <Menu changeActiveMenu={changeActiveMenu} />
            {
              activeContent === 'account'
                ? <AccountInfo />
                : (activeContent === 'password'
                  ? <PasswordChange />
                  : null)
            }
          </Box>
        </ContentWithSidebar>
      </Row>
    </Container>
  );
};

const Menu: React.FunctionComponent<{ changeActiveMenu: (value: string) => void }> = ({ changeActiveMenu }) => {
  return (
    <Box display='flex' justifyContent='center' flexDirection='column'>
      <SideMenuItem onContentChange={changeActiveMenu} text='Account' />
      <SideMenuItem onContentChange={changeActiveMenu} text='Password' />
    </Box>
  );
};

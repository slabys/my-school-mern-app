import React from 'react';
import { Divider, Grid, Paper, styled, Typography } from '@mui/material';

const Column = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body1,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export const ContentWithSidebar: React.FunctionComponent<{
  menu: React.ReactNode,
  content: React.ReactNode
}> = ({ menu, content }) => {
  return (
    <>
      <Grid item xs={12} sm={4} md={3} textAlign='center'>
        <Column>
          <Typography variant='h6'>Menu</Typography>
          <Divider/>
          {menu}
        </Column>
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <Column>
          {content}
        </Column>
      </Grid>
    </>
  );
};

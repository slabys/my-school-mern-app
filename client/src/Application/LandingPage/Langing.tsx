import * as React from 'react';
import {
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootSelector } from 'reducers';

export const Landing: React.FunctionComponent = () => {

  const posts = useSelector((store: IRootSelector) => store.posts);

  console.log(posts);

  return (
    <>
      <Typography> Landing Page </Typography>
    </>
  );
};

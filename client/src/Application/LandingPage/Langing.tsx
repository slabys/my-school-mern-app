import * as React from 'react';
import {
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { IRootSelector } from 'reducers';
import { createPost } from 'actions/posts';
import { Form, Formik } from 'formik';

export const Landing: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const posts = useSelector((store: IRootSelector) => store.posts);

  const handleSubmit = (values: any ) => {
    dispatch(createPost(values));
    console.log('send');
  };

  console.log(posts);

  return (
    <>
      <Typography> Landing Page </Typography>
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        {() => {
          return <Form />;
        }}
      </Formik>
    </>
  );
};

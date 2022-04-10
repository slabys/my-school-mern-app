import React from 'react';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import { Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createPost } from 'actions';
import * as Yup from 'yup';
import { getCookie } from 'utils/utils';

export interface NewPostTypes {
  title: string,
  description: string,
  prizeType: string,
  prize: string,
  creatorId: string,
  categories: string,
  createdAt: Date;
}

const NewPostInitValues: NewPostTypes = {
  title: '',
  description: '',
  prizeType: 'FREE',
  prize: '',
  creatorId: '',
  categories: '',
  createdAt: new Date(),
};

export const CreateNewPost: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values: NewPostTypes) => {
    const tags = values.categories.split(',');
    dispatch(createPost({ ...values, createdAt: new Date(), categories: tags, creatorId: JSON.parse(getCookie('profile') as string)?.result?._id }));
  };

  const validationSchema = () => Yup.object().shape({
    title: Yup.string().trim().required(),
    description: Yup.string().trim().required(),
    prizeType: Yup.string().trim().required(),
    prize: Yup.string().trim(),
    categories: Yup.string().trim(),
  });
  return (
    <>
      <Formik
        initialValues={NewPostInitValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange }) => (
          <Form style={{ width: '100%' }}>
            <TextField
              margin='normal'
              id='title'
              name='title'
              label='Title'
              autoFocus
              value={values.title}
              onChange={handleChange}
            />
            <ErrorMessage
              name='title'
              render={error => <Typography sx={{ color: 'red' }}>
                {error}
              </Typography>
              }
            />
            <TextField
              margin='normal'
              fullWidth
              multiline
              rows={4}
              id='description'
              name='description'
              label='Description'
              value={values.description}
              onChange={handleChange}
            />
            <ErrorMessage name='description' render={
              error => <Typography sx={{ color: 'red' }}>{error}</Typography>
            } />
            <Grid item display='flex' flexDirection='row' alignItems='center' xs={12}>
              <Grid item xs={12} md={3}>
                <FormControl sx={{ mt: 1 }} variant='standard'>
                  <Field
                    component={TextField}
                    type='text'
                    select={true}
                    fullWidth
                    variant='outlined'
                    id='prizeType'
                    name='prizeType'
                    value={values.prizeType}
                    onChange={handleChange('prizeType')}
                  >
                    <MenuItem value='FREE'>FREE</MenuItem>
                    <MenuItem value='BUY'>BUY</MenuItem>
                    <MenuItem value='SELL'>SELL</MenuItem>
                  </Field>
                </FormControl>
                <ErrorMessage name='prizeType' render={
                  error => <Typography sx={{ color: 'red' }}>{error}</Typography>
                } />
              </Grid>
              {values.prizeType === 'SELL'
                ? <Grid item xs={12} md={3} ml={3}>
                  <TextField
                    fullWidth
                    margin='normal'
                    id='prize'
                    name='prize'
                    label='Prize'
                    value={values.prize}
                    onChange={handleChange}
                  />
                </Grid>
                : null}
            </Grid>
            <TextField
              margin='normal'
              fullWidth
              id='categories'
              name='categories'
              label='Tags/Categories (divide by comma)'
              value={values.categories}
              onChange={handleChange}
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Create post
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

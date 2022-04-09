import React from 'react';
import {
  Avatar,
  Box, BoxProps,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  ListItemAvatar,
  ListItemText, Stack,
  Typography,
} from '@mui/material';
import { Close, Email, LocationCity, Phone } from '@mui/icons-material';
import { useLocation } from 'wouter';
import { PostData } from 'reducers';
import image from 'images/image.jpg';
import { formatDate } from 'utils/utils';

export const PostModal: React.FunctionComponent<{ postItem: PostData }> = ({ postItem }) => {
  const [, setLocation] = useLocation();

  return (
    <Dialog maxWidth='lg' fullWidth open scroll='body' onClose={() => {
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
        <ModalContent post={postItem} />
      </DialogContent>
    </Dialog>
  );
};

const ModalContent: React.FunctionComponent<{ post: PostData }> = ({ post }) => {
  return (
    <Grid container spacing={2}>
      <Grid item display='flex' flexDirection='column' xs={12} md={4}>
        <Box width='100%'>
          <img
            src={image}
            alt={post.title}
            width='100%'
            loading='lazy'
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant='h4' paragraph={false}>{post.title}</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography>
          {post.description}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack direction='row' sx={{ justifyContent: 'space-between'}}>
          <Typography variant='h5' paragraph={false}>Info about product:</Typography>
          <Box>
            {
              post.prize && post.prize === 'FREE'
                ? <Typography>{post.prizeType}</Typography>
                : <Typography>{post.prizeType}: {post.prize}</Typography>
            }
          </Box>
        </Stack>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant='body1'>Created
          by <b>{post.creatorId.nickname}</b> on <i>{formatDate(new Date(post.createdAt))}</i></Typography>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          <Item>
            <ListItemAvatar>
              <Avatar>
                <LocationCity />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='City' secondary={post.creatorId.city} />
          </Item>
          <Item>
            <ListItemAvatar>
              <Avatar>
                <Email />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Email' secondary={post.creatorId.email} />
          </Item>
          <Item>
            <ListItemAvatar>
              <Avatar>
                <Phone />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Phone number' secondary={post.creatorId.phoneNumber} />
          </Item>
        </Box>
      </Grid>
    </Grid>
  );
};

const Item = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mixWidth: 32,
          py: 1,
          ...sx,
        }}
        {...other}
      />
      <Divider sx={{ mx: 3 }} orientation='vertical' flexItem />
    </>
  );
};

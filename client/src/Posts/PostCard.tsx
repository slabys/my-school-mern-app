import React from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia, IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { Launch } from '@mui/icons-material';
import image from 'images/image.jpg';
import { PostData } from 'reducers';

export const PostCard: React.FunctionComponent<{ post: PostData, PostRedirect: React.FunctionComponent<{ children: React.ReactElement<'a'>; postId: string }>; }> = ({ post, PostRedirect }) => {
  const postDate = new Intl.DateTimeFormat('en-EN', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(new Date(post.createdAt));

  return (
    <Card>
      <CardHeader
        avatar={
          <Tooltip title={post.creatorId.nickname}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
              {post.creatorId.nickname.charAt(0).toUpperCase()}
            </Avatar>
          </Tooltip>
        }
        title={<Typography variant='h6' color='text.primary' noWrap>{post.title}</Typography>}
        subheader={postDate}
      />
      <CardMedia
        component='img'
        height='256'
        image={image}
        alt={post.title}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary' noWrap>
          {post.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <PostRedirect postId={post._id}>
          <IconButton>
            <Launch />
          </IconButton>
        </PostRedirect>
      </CardActions>
    </Card>
  );
};

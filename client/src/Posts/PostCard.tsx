import React from 'react';
import {
  Avatar, Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia, IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { Delete, Launch } from '@mui/icons-material';
import image from 'images/image.jpg';
import { PostData } from 'reducers';
import { formatDate } from 'utils/utils';

export const PostCard: React.FunctionComponent<{
  owner?: boolean,
  post: PostData,
  PostRedirect: React.FunctionComponent<{
    children: React.ReactElement<'a'>;
    postId: string
  }>;
  onDelete?: (value: string) => void
}> = ({ owner, post, PostRedirect, onDelete }) => {
  const postDate = formatDate(new Date(post.createdAt));

  const handleDelete = React.useCallback((postId: string) => {
    if (onDelete) {
      onDelete(postId);
    }
  }, [post]);

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
      <CardActions>
        {owner
          ? <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <IconButton color='error' onClick={() => {
              handleDelete(post._id);
            }}>
              <Delete />
            </IconButton>
            <PostRedirect postId={post._id}>
              <IconButton>
                <Launch />
              </IconButton>
            </PostRedirect>
          </Box>
          : <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <PostRedirect postId={post._id}>
              <IconButton>
                <Launch />
              </IconButton>
            </PostRedirect>
          </Box>}
      </CardActions>
    </Card>
  );
};

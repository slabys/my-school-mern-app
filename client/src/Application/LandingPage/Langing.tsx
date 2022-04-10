import * as React from 'react';
import {
  Box, CircularProgress,
  Container, Grid,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootSelector } from 'reducers';
import { PostCard } from 'Posts';
import { Copyright } from 'Application';
import { PostModal } from 'Application/Posts';
import { useSearchParams } from 'Application/useSearchParams';
import * as Wouter from 'wouter';

export const Landing: React.FunctionComponent = () => {
  const posts = useSelector((store: IRootSelector) => store.posts);
  const params = useSearchParams();
  const postId = params.get('post');

  const postItem = React.useMemo(() => posts.find((item) => item._id === postId) ?? null, [postId, posts]);

  const PostModalRoute: React.FunctionComponent<{ children: React.ReactElement<'a'>; postId: string }> = React.useCallback(
    ({ postId, children }) => <Wouter.Link to={`?post=${postId}`}>{children}</Wouter.Link>,
    [],
  );

  if (posts === null) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth='lg'>
      <Box display='flex' flexDirection='column'>
        <Grid container spacing={2} display='flex' flexDirection='row'>
          {posts.map((post) => {
            return (
              <Grid key={post._id} item xs={12} sm={6} md={4}>
                <PostCard post={post} PostRedirect={PostModalRoute}/>
              </Grid>
            );
          })}
        </Grid>
        <Copyright mt={6} />
        {postItem !== null
          ? <PostModal
            postItem={postItem}
            backlink='/'
          />
          : null}
      </Box>
    </Container>
  );
};

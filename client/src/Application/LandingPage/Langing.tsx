import * as React from 'react';
import {
  Box, Chip, CircularProgress,
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
  const [active, setActive] = React.useState<null | number>(null);
  const posts = useSelector((store: IRootSelector) => store.posts);
  const categoriesFetch = useSelector((store: IRootSelector) => store.categories);

  const categories = categoriesFetch.filter((item, index) => categoriesFetch.indexOf(item) === index);

  console.log(posts);
  console.log(categoriesFetch);

  if (active) console.log(posts.filter((post) => post.categories.includes(categories[active])));

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
        <Box mb={2}>
          {categories.map((category, index) => {
            return (
              category !== '' ?
                <Chip key={index} label={category} variant={index !== active ? 'outlined' : 'filled'} onClick={() => {
                  if (index === active) {
                    setActive(null);
                  } else {
                    setActive(index);
                  }
                }} /> : null
            );
          })}
        </Box>
        <Grid container spacing={2} display='flex' flexDirection='row'>
          {active
            ? posts.filter((post) => post.categories.includes(categories[active])).map((post) => {
              return (
                <Grid key={post._id} item xs={12} sm={6} md={4}>
                  <PostCard post={post} PostRedirect={PostModalRoute} />
                </Grid>
              );
            })
            : posts.map((post) => {
              return (
                <Grid key={post._id} item xs={12} sm={6} md={4}>
                  <PostCard post={post} PostRedirect={PostModalRoute} />
                </Grid>
              );
            })
          }
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

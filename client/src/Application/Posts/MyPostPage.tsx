import { Backlink } from 'Logic/Backlink';
import { Box, Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootSelector } from 'reducers';
import { PostCard } from 'Posts';
import * as Wouter from 'wouter';
import { useSearchParams } from 'Application/useSearchParams';
import { PostModal, CreateNewPost } from 'Application/Posts';
import { deletePost } from 'actions/posts';

export const MyPostPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const posts = useSelector((store: IRootSelector) => store.posts);
  const { authData } = useSelector((store: IRootSelector) => store.signUp);

  const myPosts = React.useMemo(() => posts.filter((item) => item?.creatorId?._id === authData?.result?._id) ?? null, [authData, posts]);

  const params = useSearchParams();
  const postId = params.get('post');

  const PostModalRoute: React.FunctionComponent<{ children: React.ReactElement<'a'>; postId: string }> = React.useCallback(
    ({ postId, children }) => <Wouter.Link to={`?post=${postId}`}>{children}</Wouter.Link>,
    [],
  );

  const postItem = React.useMemo(() => posts.find((item) => item._id === postId) ?? null, [postId, posts]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleDelete = React.useCallback((postId: string) => {
    console.log(postId);
    dispatch(deletePost(postId));
  }, [posts]);

  return (
    <Container maxWidth='lg'>
      <Grid item xs={12}>
        <Backlink link={'/'} />
      </Grid>
      <Tabs value={value} onChange={handleChange} variant='fullWidth'>
        <Tab label='Show my posts' {...a11yProps(0)} />
        <Tab label='Create new post' {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2} display='flex' flexDirection='row'>
          {myPosts.length !== 0
            ? myPosts.map((post) => {
              return (
                <Grid key={post._id} item xs={12} sm={6} md={4}>
                  <PostCard owner post={post} PostRedirect={PostModalRoute} onDelete={handleDelete} />
                </Grid>
              );
            })
            : <Typography>You don&apos;t have any posts</Typography>
          }
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateNewPost />
      </TabPanel>
      {postItem !== null
        ? <PostModal
          postItem={postItem}
          backlink='/myPosts'
        />
        : null}
    </Container>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

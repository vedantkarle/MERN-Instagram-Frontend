import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Dimmer,
  Feed,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Label,
  Loader,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/postActions";
import * as api from "../api";
import { GET_POSTS } from "../constants";
// import { formatDistance } from "date-fns/esm";

const Home = () => {
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);
  const { loading } = useSelector((state) => state.async);
  const { user } = useSelector((state) => state.user);

  const likePost = async (postId) => {
    const { data } = await api.likePost(postId);

    const newPostsData = posts.map((post) => {
      if (post._id === data._id) {
        return data;
      } else {
        return post;
      }
    });
    dispatch({ type: GET_POSTS, payload: newPostsData });
  };

  const addComment = async (postId, text) => {
    const { data } = await api.comment(postId, text);
    setCommentText("");
    const newPostsData = posts.map((post) => {
      if (post._id === data._id) {
        return data;
      } else {
        return post;
      }
    });
    dispatch({ type: GET_POSTS, payload: newPostsData });
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container style={{ marginTop: "60px" }}>
      {loading ? (
        <Dimmer inverted={true} active={true}>
          <Loader content="Loading..." />
        </Dimmer>
      ) : (
        <Grid>
          <Grid.Column width={10}>
            {posts?.map((post) => (
              <Card fluid key={post?._id}>
                <Card.Content>
                  <Card.Header as={Link} to={`/profile/${post?.postedBy?._id}`}>
                    {post?.postedBy?.name}
                  </Card.Header>
                </Card.Content>
                <Image src={post?.photo} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{post?.title}</Card.Header>
                  <Card.Description>{post?.body}</Card.Description>
                </Card.Content>
                <Card.Content>
                  <Header content={`Comments(${post?.comments.length})`} />
                  {post?.comments.map((comment) => (
                    <Feed key={comment._id}>
                      <Feed.Event>
                        <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
                        <Feed.Content>
                          <Feed.Date content="1 day ago" />
                          <Feed.Summary>{comment.text}</Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    </Feed>
                  ))}
                </Card.Content>
                <Card.Content extra>
                  <Button as="div" labelPosition="right">
                    <Button
                      onClick={() => likePost(post?._id)}
                      color="red"
                      basic={post?.likes.includes(user?._id) ? false : true}
                    >
                      <Icon name="heart" />
                      Like
                    </Button>
                    <Label as="a" basic color="red" pointing="left">
                      {post?.likes.length}
                    </Label>
                  </Button>
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => setShowComment(!showComment)}
                  >
                    <Button color="blue">
                      <Icon name="comments" />
                      {showComment ? "Close" : "Comment"}
                    </Button>
                    <Label as="a" basic color="blue" pointing="left">
                      {post?.comments.length}
                    </Label>
                  </Button>
                </Card.Content>
                {showComment && (
                  <Card.Content extra>
                    <Form onSubmit={() => addComment(post._id, commentText)}>
                      <Input
                        fluid
                        action="Comment"
                        placeholder="Add Comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                    </Form>
                  </Card.Content>
                )}
              </Card>
            ))}
          </Grid.Column>
          <Grid.Column width={6}>
            <Card>
              <Card.Content>
                <Card.Header>Recent Activity</Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  {posts?.map((post) => (
                    <Feed.Event key={post._id}>
                      <Feed.Label image={post?.photo} />
                      <Feed.Content>
                        <Feed.Date content="1 day ago" />
                        <Feed.Summary>{post?.title}</Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  ))}
                </Feed>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      )}
    </Container>
  );
};

export default Home;

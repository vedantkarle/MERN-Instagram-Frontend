import React, { useEffect } from "react";
import {
  Card,
  Container,
  Dimmer,
  Grid,
  Header,
  Loader,
} from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../actions/postActions";
import { getProfileUserAction } from "../../actions/userActions";

const ProfilePage = ({ match }) => {
  const dispatch = useDispatch();
  const { userPosts } = useSelector((state) => state.posts);
  const { loading } = useSelector((state) => state.async);
  const { user, profileUser } = useSelector((state) => state.user);

  const isCurrentUser = user?._id === profileUser?._id ? true : false;

  useEffect(() => {
    dispatch(getProfileUserAction(match.params.id));
    dispatch(getUserPosts());
  }, [dispatch, match.params.id]);

  return (
    <Container style={{ marginTop: "60px" }}>
      {loading ? (
        <Dimmer inverted={true} active={true}>
          <Loader content="Loading Profile..." />
        </Dimmer>
      ) : (
        <Grid>
          <Grid.Column width={16}>
            <ProfileHeader
              isCurrentUser={isCurrentUser}
              profileUser={profileUser}
              posts={userPosts}
            />
          </Grid.Column>
          {loading ? (
            <Loader active content="Loading posts..." />
          ) : userPosts?.length <= 0 ? (
            <Header content="No posts" />
          ) : (
            <Card.Group itemsPerRow={3}>
              {userPosts?.map((post) => (
                <Card key={post?._id} raised image={post.photo} />
              ))}
            </Card.Group>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default ProfilePage;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Item,
  Reveal,
  Segment,
  Statistic,
  Header,
  Button,
} from "semantic-ui-react";
import { follow, unFollow, updatePhoto } from "../../api";
import { SET_PROFILE_USER, SIGN_IN_USER } from "../../constants";
import FileBase from "react-file-base64";

const ProfileHeader = ({ isCurrentUser, profileUser, posts }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");

  const { user } = useSelector((state) => state.user);

  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                circular
                size="small"
                src={
                  profileUser?.photo ||
                  "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              <Item.Content verticalAlign="middle">
                <Header
                  as="h1"
                  style={{ display: "block", marginBottom: 10 }}
                  content={profileUser?.name}
                />
              </Item.Content>
            </Item>
            <Item>
              <FileBase
                type="file"
                multiple={false}
                onDone={async ({ base64 }) => {
                  setImage(base64);
                  const newUser = await updatePhoto(profileUser?._id, image);
                  dispatch({ type: SIGN_IN_USER, payload: newUser.data });
                  dispatch({ type: SET_PROFILE_USER, payload: newUser.data });
                }}
              />
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Statistic size="tiny">
              <Statistic.Value>{posts.length}</Statistic.Value>
              <Statistic.Label>Posts</Statistic.Label>
            </Statistic>
            <Statistic size="tiny">
              <Statistic.Value>{profileUser?.followers.length}</Statistic.Value>
              <Statistic.Label>Followers</Statistic.Label>
            </Statistic>
            <Statistic size="tiny">
              <Statistic.Value>{profileUser?.following.length}</Statistic.Value>
              <Statistic.Label>Following</Statistic.Label>
            </Statistic>
          </div>
          <>
            {/* <Divider /> */}
            {!isCurrentUser && (
              <Reveal animated="move">
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button
                    fluid
                    color="teal"
                    content={
                      profileUser?.followers.includes(user._id)
                        ? "Following"
                        : "Not Following"
                    }
                  />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button
                    onClick={async () => {
                      let res;
                      if (profileUser?.followers.includes(user._id)) {
                        res = await unFollow(profileUser?._id);
                      } else {
                        res = await follow(profileUser?._id);
                      }
                      dispatch({
                        type: SET_PROFILE_USER,
                        payload: res.data,
                      });
                    }}
                    basic
                    fluid
                    color={
                      profileUser?.followers.includes(user._id)
                        ? "red"
                        : "green"
                    }
                    content={
                      profileUser?.followers.includes(user._id)
                        ? "Unfollow"
                        : "Follow"
                    }
                  />
                </Reveal.Content>
              </Reveal>
            )}
          </>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default ProfileHeader;

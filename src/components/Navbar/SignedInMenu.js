import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../actions/userActions";

const SignedInMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.user);

  return (
    <Menu.Item position="right">
      <Button as={Link} to={`/profile/${user._id}`} basic content="Profile" />
      <Button
        as={Link}
        to="/create"
        basic
        content="Create Post"
        style={{ marginLeft: "0.5em" }}
      />
      <Button
        onClick={() => {
          dispatch(signOutUser());
          history.push("/login");
        }}
        basic
        content="Logout"
        style={{ marginLeft: "0.5em" }}
      />
    </Menu.Item>
  );
};

export default SignedInMenu;

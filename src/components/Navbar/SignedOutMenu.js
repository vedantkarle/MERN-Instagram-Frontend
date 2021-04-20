import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";

const SignedOutMenu = () => {
  return (
    <Menu.Item position="right">
      <Button as={Link} to="/login" basic content="Login" />
      <Button
        as={Link}
        to="/register"
        basic
        content="Register"
        style={{ marginLeft: "0.5em" }}
      />
    </Menu.Item>
  );
};

export default SignedOutMenu;

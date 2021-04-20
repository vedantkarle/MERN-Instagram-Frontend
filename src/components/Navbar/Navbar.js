import React from "react";
import { Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Menu fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to={user ? "/" : "/login"} header>
          Instagram
        </Menu.Item>
        {user ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
};

export default Navbar;

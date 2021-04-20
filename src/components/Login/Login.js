import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import MyTextInput from "../../common/form/MyTextInput";
import { Button, Card, Divider, Header, Icon, Label } from "semantic-ui-react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../actions/userActions";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);

  return (
    <div className="login">
      <div className="login__container">
        <Card color="orange" style={{ padding: "20px", width: "300px" }}>
          <Header as="h2" icon textAlign="center">
            <Icon name="instagram" circular />
            <Header.Content>Instagram</Header.Content>
          </Header>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string().required().email(),
              password: Yup.string().required(),
            })}
            onSubmit={({ email, password }) => {
              const user = { email, password };
              dispatch(signInUser(user));
            }}
          >
            {({ isSubmitting, dirty, isValid }) => (
              <Form className="ui form">
                <MyTextInput name="email" placeholder="Email Address" />
                <MyTextInput
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                {error && (
                  <Label
                    basic
                    color="red"
                    style={{ marginBottom: 10 }}
                    content={error}
                  />
                )}
                <Button
                  loading={loading}
                  disabled={!isValid || !dirty}
                  type="submit"
                  fluid
                  size="large"
                  color="blue"
                  content="Login"
                />
                <Divider horizontal>Or</Divider>
              </Form>
            )}
          </Formik>
        </Card>
        <Card
          color="orange"
          style={{ padding: "20px", width: "300px", textAlign: "center" }}
        >
          <Header size="small">
            Don't have an account ? <Link to="/register">Register</Link>
          </Header>
        </Card>
      </div>
    </div>
  );
};

export default Login;

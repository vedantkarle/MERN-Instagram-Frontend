import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import MyTextInput from "../../common/form/MyTextInput";
import { Button, Card, Divider, Header, Icon, Label } from "semantic-ui-react";
import "./Register.css";
import { registerUser } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);
  const [image, setImage] = useState("");

  return (
    <div className="register">
      <div className="register__container">
        <Card color="orange" style={{ padding: "20px", width: "300px" }}>
          <Header as="h2" icon textAlign="center">
            <Icon name="instagram" circular />
            <Header.Content>Instagram</Header.Content>
          </Header>
          <Formik
            initialValues={{ name: "", email: "", password: "", photo: "" }}
            validationSchema={Yup.object({
              name: Yup.string().required(),
              email: Yup.string().required().email(),
              password: Yup.string().required(),
            })}
            onSubmit={({ name, email, password }) => {
              const user = { name, email, password, photo: image };
              dispatch(registerUser(user));
              history.push("/");
            }}
          >
            {({ dirty, isValid }) => (
              <Form className="ui form">
                <MyTextInput name="name" placeholder="Your Name" />
                <MyTextInput name="email" placeholder="Email Address" />
                <MyTextInput
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setImage(base64)}
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
                  content="Register"
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
            Already have an account ? <Link to="/login">Login</Link>
          </Header>
        </Card>
      </div>
    </div>
  );
};

export default Register;

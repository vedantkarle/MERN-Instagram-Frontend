import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "../common/form/MyTextInput";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import * as api from "../api";

const CreatePost = ({ history }) => {
  const initialValues = {
    title: "",
    body: "",
    image: "",
  };

  const [image, setImage] = useState("");

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title!"),
    body: Yup.string().required("You must provide a body!"),
  });

  return (
    <Container style={{ marginTop: "60px" }}>
      <Segment clearing>
        <Header
          size="large"
          content="Create Post"
          style={{ textAlign: "center" }}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async ({ title, body }, { setSubmitting }) => {
            try {
              const post = { title, body, image };
              await api.createPost(post);
              history.push("/");
              toast.success("Post created successfully!");
              setSubmitting(false);
            } catch (error) {
              toast.error(error.response.data.message);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form className="ui form">
              <Header sub color="teal" content="Title" />
              <MyTextInput name="title" placeholder="Post Title" />
              <Header sub color="teal" content="Body" />
              <MyTextInput name="body" placeholder="Body" />
              <Header sub color="teal" content="Image" />
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setImage(base64)}
              />
              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type="submit"
                floated="right"
                positive
                content="Submit"
              />
              <Button
                as={Link}
                to="/"
                disabled={isSubmitting}
                type="submit"
                floated="right"
                content="Cancel"
              />
            </Form>
          )}
        </Formik>
      </Segment>
    </Container>
  );
};

export default CreatePost;

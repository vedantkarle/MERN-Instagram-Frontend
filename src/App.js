import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./components/Profile/ProfilePage";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { SIGN_IN_USER } from "./constants";

const Routing = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    dispatch({ type: SIGN_IN_USER, payload: user });

    // if (user) {
    //   history.push("/");
    // } else {
    //   history.push("/login");
    // }
  }, [dispatch, history]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/create" component={CreatePost} />
      <Route path="/profile/:id" component={ProfilePage} />
    </Switch>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="bottom-right" hideProgressBar />
      <Routing />
    </Router>
  );
}

export default App;

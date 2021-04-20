import {
  GET_USER_POSTS,
  SET_PROFILE_USER,
  SIGN_IN_USER,
  SIGN_OUT_USER,
} from "../constants";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../reducers/asyncReducer";
import axios from "axios";
import { getProfileUser } from "../api";

export const signInUser = (user) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());
    const res = await axios.post("/api/login", {
      email: user.email,
      password: user.password,
    });
    localStorage.setItem("jwt", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    dispatch({ type: SIGN_IN_USER, payload: res.data.user });
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionFinish());
    dispatch(asyncActionError(error.response.data.message));
  }
};

export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());
    const res = await axios.post("/api/register", {
      name: user.name,
      email: user.email,
      password: user.password,
      photo: user.photo,
    });
    dispatch({ type: SIGN_IN_USER, payload: res.data.user });
    localStorage.setItem("jwt", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionFinish());
    dispatch(asyncActionError(error.response.data.message));
  }
};

export const getProfileUserAction = (id) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());
    const res = await getProfileUser(id);
    dispatch({ type: GET_USER_POSTS, payload: res.data.posts });
    dispatch({ type: SET_PROFILE_USER, payload: res.data.user });
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionFinish());
    dispatch(asyncActionError(error.response.data.message));
  }
};

export const signOutUser = () => {
  return {
    type: SIGN_OUT_USER,
  };
};

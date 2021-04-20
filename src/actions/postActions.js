import { GET_POSTS, GET_USER_POSTS } from "../constants";
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish,
} from "../reducers/asyncReducer";
import * as api from "../api";

export const getPosts = () => async (dispatch) => {
  try {
    dispatch(asyncActionStart());
    const res = await api.fetchPosts();
    dispatch({ type: GET_POSTS, payload: res.data });
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error.response.message));
  }
};

export const getUserPosts = () => async (dispatch) => {
  try {
    dispatch(asyncActionStart());
    const res = await api.fetchUserPosts();
    dispatch({ type: GET_USER_POSTS, payload: res.data });
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error.response.message));
  }
};

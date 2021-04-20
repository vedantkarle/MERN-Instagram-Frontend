import { GET_POSTS, GET_USER_POSTS } from "../constants";

const initialState = {
  posts: [],
  userPosts: [],
};

const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
      };
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: payload,
      };
    default:
      return state;
  }
};

export default postsReducer;

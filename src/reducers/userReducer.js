import { SET_PROFILE_USER, SIGN_IN_USER, SIGN_OUT_USER } from "../constants";

const initialState = {
  user: null,
  profileUser: null,
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGN_IN_USER:
      return {
        ...state,
        user: payload,
      };
    case SIGN_OUT_USER:
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      return {
        ...state,
        user: null,
      };
    case SET_PROFILE_USER:
      return {
        ...state,
        profileUser: payload,
      };
    default:
      return state;
  }
}

import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import asyncReducer from "./reducers/asyncReducer";
import userReducer from "./reducers/userReducer";
import postsReducer from "./reducers/postReducer";

const reducer = combineReducers({
  user: userReducer,
  async: asyncReducer,
  posts: postsReducer,
});

export function configureStore() {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );

  return store;
}

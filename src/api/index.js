import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`;
  }
  return req;
});

export const fetchPosts = () => API.get("/posts");

export const fetchUserPosts = () => API.get("/posts/my");

export const createPost = (post) => API.post("/posts/new", post);

export const likePost = (postId) => API.post(`/like/${postId}`);

export const unLikePost = (postId) => API.post(`/unlike/${postId}`);

export const comment = (postId, text) =>
  API.post(`/comment/${postId}`, { text });

export const getProfileUser = (id) => API.get(`/profile/${id}`);

export const follow = (id) => API.post(`/follow/${id}`);

export const unFollow = (id) => API.post(`/unfollow/${id}`);

export const updatePhoto = (id, image) => API.put(`/updatePhoto/${id}`, image);

import axios from "axios";
import { API_URLS } from "../constants";

const errorHandler = (error) => {
  console.log(error.message);
  return { data: [] };
};

export const getBlogs = async () => {
  const blogs = await axios.get(API_URLS.blogs).catch(errorHandler);
  return blogs.data;
};

export const getUsers = async () => {
  const users = await axios.get(API_URLS.users).catch(errorHandler);
  return users.data;
};

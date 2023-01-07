import axios from "axios";
import { baseURL } from "./baseUrl.js";

const get = async (url) => {
  const token = localStorage.getItem("token");
  return axios.get(baseURL + url, {
    headers: {
      "x-auth-token": token,
    },
    credentials: "omit",
  });
};

const post = async (url, body) => {
  const token = localStorage.getItem("token");
  return axios.post(baseURL + url, body, {
    headers: {
      "x-auth-token": token,
    },
    credentials: "omit",
  });
};

export const signup = async (state) => {
  const response = await post("/signup", state);
  return response.data;
};

export const loggedin = async (day, year) => {
  const response = await get(`/loggedin/${day}/${year}`);
  return response.data;
};

export const login = async (username, password, day, year) => {
  const response = await post("/login", { username, password, day, year });
  return response.data;
};

export const loginTest = async () => {
  const response = await post("/loginTest");
  return response.data;
};

export const create = async (info) => {
  const response = await post("/log/create", { info });
  return response.data;
};

export const getDate = async (year, dayOfYear) => {
  const response = await get(`/log/date/${year}/${dayOfYear}`);
  return response.data;
};

export const profile = async () => {
  const response = await get(`/log/all/my-posts`);
  return response.data;
};

export const seeUser = async (userId) => {
  console.log("SEEING USER ", userId);
  const response = await get(`/log/all/${userId}`);
  return response.data;
};

export const changeInfo = async (userInfo) => {
  const response = await post(`/change-info`, { userInfo });
  return response.data;
};

export const changePass = async (userInfo) => {
  const response = await post(`/change-password`, { userInfo });
  return response.data;
};

export const deleteUser = async (confirmation) => {
  const response = await post(`/delete-user`, { confirmation });
  return response.data;
};

export const logout = async () => {
  const response = await post("/logout", {});
  return response.data;
};

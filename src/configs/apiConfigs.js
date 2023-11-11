import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const registerUser = (userRegisterDto) => {
  return API.post("/Accounts/RegisterAccount", userRegisterDto);
};
export const loginUser = (userSignInDto) => {
  return API.post("/Accounts/Login", userSignInDto);
};

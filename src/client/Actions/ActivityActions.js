import { CHECK_SIGN_IN, GET_USERS } from "./types";

export const checkSignIn = ({ email, password }) => {
  return {
    type: CHECK_SIGN_IN,
    payload: { email, password }
  };
};

export const getUsers = () => {
  return {
    type: GET_USERS
  };
};

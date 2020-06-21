import axios from "axios";

const signIn = values => {
  try {
    var result = axios.post(`/api/v1.0/auth/login`, values);
    return result;
  } catch (err) {
    console.log("registerUser -> err", err);
    return err;
  }
};
export { signIn };

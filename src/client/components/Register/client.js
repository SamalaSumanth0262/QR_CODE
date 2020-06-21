import axios from "axios";

const registerUser = (data) => {
  try {
    var result = axios.post(`/api/v1.0/auth/registerUser`, data);
    return result;
  } catch (err) {
    console.log("registerUser -> err", err);
    return err;
  }
}

export { registerUser };
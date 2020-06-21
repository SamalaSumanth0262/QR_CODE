import axios from "axios";

const getTwilioAccessToken = async () => {
  try {
    var result = await axios.get(`/api/v1.0/twilio/twilio_access_token`);
    console.log("getTwilioAccessToken -> result", result);
    return result.data.data; //TO_DO: handle undefined class
  } catch (err) {
    console.log("getTwilioAccessToken -> err", err);
    return err;
  }
};

export { getTwilioAccessToken };

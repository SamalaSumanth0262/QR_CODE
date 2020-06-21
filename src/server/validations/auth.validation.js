const { commonValidations } = require("./common.validation");
module.exports = {
  //TO_DO: write validation for form - data
  registerUser: {
    body: {
      name: commonValidations.stringRequired,
      email: commonValidations.emailRequired,
      password: commonValidations.stringRequired,
      phone_number: commonValidations.stringRequired
    }
  },
  loginUser: {
    body: {
      email: commonValidations.emailRequired,
      password: commonValidations.stringRequired //TO_DO write a separate validaiton for strong Password
    }
  },
  refreshToken: {
    body: {
      email: commonValidations.emailRequired,
      refreshToken: commonValidations.stringRequired
    },
    headers: {
      // 'csrf-token': commonValidations.stringRequired
    },
    params: {},
    query: {}
  }
};

import { CHECK_SIGN_IN, GET_USERS } from "../actions/types";

const initialState = {
  authenticated: false,
  loginTryCount: 0,
  users: []
};

function checkCreds({ email, password }) {
  return email === "hruday@gmail.com" && password === "hruday123";
}
export default function(state = initialState, action) {
  switch (action.type) {
    case CHECK_SIGN_IN:
      const { email, password } = action.payload;
      return checkCreds({ email, password })
        ? {
            ...state,
            authenticated: true,
            loginTryCount: state.loginTryCount + 1
          }
        : { ...state, loginTryCount: state.loginTryCount + 1 };

    case GET_USERS:
      return {
        ...state,
        users: [
          {
            id: 1,
            name: "test1",
            age: "11",
            gender: "male",
            email: "test1@gmail.com",
            phoneNo: "9415346313"
          },
          {
            id: 2,
            name: "test2",
            age: "12",
            gender: "male",
            email: "test2@gmail.com",
            phoneNo: "9415346314"
          },
          {
            id: 3,
            name: "test3",
            age: "13",
            gender: "male",
            email: "test3@gmail.com",
            phoneNo: "9415346315"
          },
          {
            id: 4,
            name: "test4",
            age: "14",
            gender: "male",
            email: "test4@gmail.com",
            phoneNo: "9415346316"
          },
          {
            id: 5,
            name: "test5",
            age: "15",
            gender: "male",
            email: "test5@gmail.com",
            phoneNo: "9415346317"
          },
          {
            id: 6,
            name: "test6",
            age: "16",
            gender: "male",
            email: "test6@gmail.com",
            phoneNo: "9415346318"
          }
        ]
      };

    default:
      return state;
  }
}

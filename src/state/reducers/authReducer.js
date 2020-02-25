import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from "../types";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  isSignedUp: false,
  error: ""
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoggedIn: false,
        isLoggedIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload
      };
    case SIGNUP_START:
      return {
        ...state,
        isSignedUp: false,
        isLoading: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSignedUp: true,
        isLoading: false
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isSignedUp: false,
        error: action.payload
      };
    default:
      return state;
  }
};
export default authReducer;

import {
  BLOCK_USER_FAILURE,
  BLOCK_USER_SUCCESS,
  BLOCK_USER_START,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from "../types";

const initialState = {
  userData: {},
  isLoading: false,
  isUserBlocked: null,
  error: ""
};

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case BLOCK_USER_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case BLOCK_USER_SUCCESS: {
      return {
        ...state,
        isUserBlocked: action.payload.updatedInfo.blocked
      };
    }
    case BLOCK_USER_FAILURE: {
      return {
        ...state,
        error: ""
      };
    }
    case FETCH_USER_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        isLoading: false
      };
    }
    case FETCH_USER_FAILURE: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default userReducer;

import {
  GET_USER_BY_PROJECT_ID,
  GET_USER_SEARCH,

} from "../../constants/User/UserCyberBugsConstant";


const stateDefault = {
  userSearch: [], //Filter lại
  arrUser: [], // Array User for select Createtask
};

const UserCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {

    case GET_USER_SEARCH: {
      return { ...state, userSearch: action.listUserSearch };
    }

    case GET_USER_BY_PROJECT_ID: {
      console.log();
      return { ...state, arrUser: action.arrUser };
    }

    default:
      return { ...state };
  }
};

export default UserCyberBugsReducer;

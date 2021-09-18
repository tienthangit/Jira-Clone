import { USER_LOGIN } from "../../../utility/System/settingSystem";
import {
  USLOGIN,
} from "../../constants/User/UserConstant";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: usLogin,
};

const UserLoginRedcuer = (state = stateDefault, action) => {
  switch (action.type) {

    case USLOGIN: {
      return { ...state ,userLogin :action.userLogin};
    }

    default:
      return { ...state };
  }
};

export default UserLoginRedcuer;

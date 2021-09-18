import { userService } from "../../../services/User/UserService";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../utility/System/settingSystem";
import { notifiFunction } from "../../../utility/Notification/notifiFunction";
import {
  USER_LOGIN_API,
  USER_SIGNUP_SAGA,
  USLOGIN,
} from "../../constants/User/UserConstant";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/Loading/LoadingConstant";
import { history } from "../../../utility/History/history";
import createAction from "../../actions";
import { HANDLE_MODAL } from "../../constants/Modal/ModalConstant";

//Sign up
function* signup(action) {
  const { userInfo } = action;

  console.log("signUpUser",userInfo);
 
  try {
    const { data } = yield userService.signupUser(userInfo);
    notifiFunction("success", `${data.message}`)

    yield delay(2000)

    yield put(createAction(HANDLE_MODAL,false))

  } catch (err) {
    if (err.response.data.statusCode === STATUS_CODE.BAD_REQUEST) {
      notifiFunction("error", `${err.response.data.message}`)
    }

    //Lỗi hệ thống 
    console.log(err);
  }
}

export function* watcherSignUp() {
  yield takeLatest(USER_SIGNUP_SAGA, signup);
}

// Quản lý
function* login(action) {
  console.log(action);

  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(1000);
  //gọi API
  try {
    const { data } = yield call(() => userService.signinUser(action.userLogin));
    console.log("dataLogin", data);
    // Lưu vào localStorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    history.push("/");
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* watcherSignin() {
  yield takeLatest(USER_LOGIN_API, login);
}

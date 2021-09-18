import { call, put, takeLatest } from "redux-saga/effects";
import { userCyberBugService } from "../../../services/User/UserCyberBugsService";
import { userService } from "../../../services/User/UserService";
import { notifiFunction } from "../../../utility/Notification/notifiFunction";
import { STATUS_CODE } from "../../../utility/System/settingSystem";
import { GET_LIST_PROJECT_SAGA } from "../../constants/Project/ProjectConstant";
import { ADD_USER_PROJECT_API, GET_USER_API_SAGA, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SEARCH, REMOVE_USER_PROJECT_API } from "../../constants/User/UserCyberBugsConstant";

// Delete User From Project
function* removeUserProjectSaga(action) {
  console.log(action);

  // gọi API
  try {
    const { data, status } = yield call(() =>
      userCyberBugService.deleteUserFromProject(action.userProject)
    );
    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (err) {
    if ( err.response.data.statusCode === STATUS_CODE.FORBIDDEN_ERROR) {
        notifiFunction("error", `${err.response.data.message}`)
    }
    console.log(err);
  }
}

export function* watcherRemoveUserProject() {
  yield takeLatest(REMOVE_USER_PROJECT_API, removeUserProjectSaga);
}

//Search to get user
function* getUserSaga(action) {
  // gọi API
  try {
    const { data, status } = yield call(() =>
    userCyberBugService.getUser(action.keyword)
    );

    yield put({
      type: GET_USER_SEARCH,
      listUserSearch: data.content,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* watcherGetUser() {
  yield takeLatest(GET_USER_API_SAGA, getUserSaga);
}

//Add
function* addUserProjectSaga(action) {
  // console.log(action);

  // gọi API
  try {
    const { data, status } = yield call(() =>
      userCyberBugService.assignUserProject(action.userProject)
    );

    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (err) {

    const {statusCode , message } = err.response.data;

    if(statusCode === STATUS_CODE.FORBIDDEN_ERROR) {
      notifiFunction("error",`${message}`)
    }
    console.log(err);
  }
}

export function* watcherAddUserProject() {
  yield takeLatest(ADD_USER_PROJECT_API, addUserProjectSaga);
}

// Get user by Project id
//Get user by project Id
function* getUserByProjectIdSaga(action) {
  const { idProject } = action;

  console.log('idProject',idProject)
  try {
    const { data, status } = yield call(() =>
      userCyberBugService.getUserByProjectId(idProject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      console.log("dataGetUserByProjectId",data.content);
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: data.content, 
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
    if(err.response?.data.statusCode === STATUS_CODE.NOT_FOUND){
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: [], 
      })
    }
  }
}

export function* watcherGetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}

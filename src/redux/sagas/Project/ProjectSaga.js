import { call, delay, put, takeLatest } from "redux-saga/effects";
import { projectServie } from "../../../services/Project/ProjectService";
import { history } from "../../../utility/History/history";
import { STATUS_CODE } from "../../../utility/System/settingSystem";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/Loading/LoadingConstant";
import {
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SAGA,
  GET_PROJECT_DETAIL_SAGA,
  PUT_PROJECT_DETAIL,
  UPDATE_PROJECT_SAGA,
} from "../../constants/Project/ProjectConstant";
import {notifiFunction} from "../../../utility/Notification/notifiFunction"
import { CLOSE_DRAWER } from "../../constants/Drawer/DrawerConstant";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../constants/User/UserCyberBugsConstant";

// Create New Project
function* createProjectSaga(action) {
  // console.log("createProjectAction",action)
  // Hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  const { data, status } = yield call(() =>
    projectServie.createProjectAuthorization(action.newProject)
  );
  try {
    // Gọi API thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
    }
    history.push("/projectmanagement");
  } catch (err) {
    console.log("data", data);
  }

  // Hiển thị loading
  yield put({
    type: HIDE_LOADING,
  });
}

export function* watcherCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

// Category of Project
function* getAllProjectCategorySaga(action) {
  console.log("actionSaga", action);
  const { data, status } = yield call(() =>
    projectServie.getAllProjectCategory()
  );
  try {
    // Gọi API thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_CATEGORY,
        data: data.content,
      });
    }
  } catch (err) {
    console.log("data", data);
  }
}

export function* watcherGetAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}


// Get All Project 
function* getListProjectSaga(action) {
  // console.log(action)
  
  try {
    const { data, status } = yield call(() =>
      projectServie.getListProject()
    );

    //Sau khi lấy DL từ API thành công
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_PROJECT,
        projectList: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* watcherGetListProjectSaga() {
  yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}

//Update Project
function* updateProjectSaga(action) {
  console.log("action123", action);
  // Hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      projectServie.updateProject(action.projectUpdate)
    );
    // Gọi API thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
    }
    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });

    yield put({
      type: CLOSE_DRAWER,
    });

  } catch (err) {
    console.log(err)
  }
  // Hiển thị loading
  yield put({
    type: HIDE_LOADING,
  });
}

export function* watcherUpdateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}


//Delete Project
function* deleteProjectSaga(action) {
  // console.log("deleteAction", action);

  try {
    const { data, status } = yield call(() =>
      projectServie.deleteProject(action.idProject)
    );
    // Gọi API thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      notifiFunction("success", "Delete project successfully!");
    } else {
      notifiFunction("error", "Delete project fail!");
    }

    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });

  } catch (err) {
    notifiFunction("error", "Delete project fail!");
    // console.log("data", data);
  }

  // Hiển thị loading
  yield put({
    type: HIDE_LOADING,
  });
}

export function* watcherDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}


//Get all project - Create Task
function* getProjectAllSaga(action) {
  console.log(action)
  try {
    const { data, status } = yield call(() =>
      projectServie.getAllProject()
    );
    // console.log("data", data);
    // console.log('status',status);

    //Sau khi lấy DL từ API thành công
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT,
        arrProject: data.content,
      });

      //trường hợp trong cho get User từ khi load đầu tiên của project đầu tiên
      yield put({
        type: GET_USER_BY_PROJECT_ID_SAGA,
        idProject: data.content[0].id,
      })
    }
  } catch (err) {
    console.log(err);
  }
}

export function* watcherGetProjectAllSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getProjectAllSaga);
}

//Get project detail
// Get Detail Project getProjectDetail
//Delete Project
function* getProjectDetailSaga(action) {

  try {
    const { data, status } = yield call(() =>
      projectServie.getProjectDetail(action.projectId)
    );
    console.log(data);

    // Lấy dữ liệu thành công thì đưa lên redux
    yield put({
      type: PUT_PROJECT_DETAIL,
      projectDetail: data.content,
    });

  } catch (err) {
    console.log(err);
    history.push("/projectmanagement");
  }

  // Hiển thị loading
  yield put({
    type: HIDE_LOADING,
  });
}

export function* watcherGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}

import { call, put, takeLatest, delay, select } from "redux-saga/effects";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/Loading/LoadingConstant";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  CREATE_TASK_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
  UPDATE_STATE_TASK_SAGA,
} from "../../constants/Task/TaskConstant";
import { taskService } from "../../../services/Task/TaskService";
import { STATUS_CODE } from "../../../utility/System/settingSystem";
import { notifiFunction } from "../../../utility/Notification/notifiFunction";
import { CLOSE_DRAWER } from "../../constants/Drawer/DrawerConstant";
import { GET_PROJECT_DETAIL_SAGA } from "../../constants/Project/ProjectConstant";
import { GET_ALL_COMMENT_TASK, GET_ALL_COMMENT_TASK_SAGA } from "../../constants/CommentTask/CommentTaskConstant";

//Create
function* createTaskSaga(action) {
  console.log(action.taskObject);
  try
  {
    yield put({
      type: DISPLAY_LOADING,
    });

    yield delay(500);

    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );

    if (status === STATUS_CODE.SUCCESS)
    {
      console.log(data.content);
    }

    yield put({
      type: CLOSE_DRAWER,
    });

    notifiFunction("success", "Create success!");
  } catch (err)
  {
    console.log(err);
  }

  // Hiển thị loading
  yield put({
    type: HIDE_LOADING,
  });
}

export function* watcherCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

//get Task Detail
function* getTaskDetailSaga(action) {
  console.log("taskId", action.taskId);
  const { taskId } = action;

  try
  {
    const { data, status } = yield call(() =>
      taskService.getTaskDetail(taskId)
    );

    yield put({
      type: GET_TASK_DETAIL,
      taskDetailModal: data.content,
    });

    //Get all comment from taskId 
    yield put({
      type: GET_ALL_COMMENT_TASK_SAGA,
    });

  } catch (err)
  {
    console.log(err);
    console.log(err.response?.data);
  }


}

export function* watcherGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

// update when dragging task
function* updateTaskStatusSaga(action) {
  const { taskUpdateStatus } = action;
  console.log("taskUpdateStatus", taskUpdateStatus);
  try
  {
    // cập nhậy API status cho task hiện tại(Task đang mở modal)
    const { data, status } = yield call(() =>
      taskService.updateStatusTask(taskUpdateStatus)
    );

    // sau khi thành công gọi lại getProjectDetail saga để sắp xếp lại thông tin cho các tásk
    console.log("data", data);
    if (status === STATUS_CODE.SUCCESS)
    {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: taskUpdateStatus.projectId,
      });

      // yield put({
      //   type: GET_TASK_DETAIL_SAGA,
      //   taskId: taskUpdateStatus.taskId,
      // });
    }
  } catch (err)
  {
    console.log("404 not found !");
  }
}

export function* watcherUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_STATE_TASK_SAGA, updateTaskStatusSaga);
}

// Update task with handling different cases
function* handleChangePostAPI(action) {
  console.log(action);
  // Call action to change task Detail Modal
  switch (action.actionType)
  {
    case CHANGE_TASK_MODAL:
      {
        const { value, name } = action;

        yield put({
          type: CHANGE_TASK_MODAL,
          name,
          value,
        });
      }
      break;
    case CHANGE_ASSIGNESS:
      {
        const { userSelected } = action;
        yield put({
          type: CHANGE_ASSIGNESS,
          userSelected,
        });
      }
      break;
    case REMOVE_USER_ASSIGN:
      {
        const { userId } = action;
        yield put({
          type: REMOVE_USER_ASSIGN,
          userId,
        });
      }
      break;
    default:
      break;
  }

  // Save change by API UpdateTaskSaga
  // Use data from state.taskDetailModal
  let { taskDetailModal } = yield select((state) => state.TaskReducer);
  console.log("Sau khi biến đổi", taskDetailModal);

  // Change state.taskDetailModal to data which API need
  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });

  const taskDetailModalAPI = { ...taskDetailModal, listUserAsign };

  const { data, status } = yield call(() =>
    taskService.updateTask(taskDetailModalAPI)
  );

  try
  {
    if (status === STATUS_CODE.SUCCESS)
    {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: taskDetailModalAPI.projectId,
      });

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskDetailModalAPI.taskId,
      });
    }
  } catch (err)
  {
    console.log(err.response?.data);
    console.log(err);
  }
}
export function* watcherHandleChangePostAPI() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostAPI);
}

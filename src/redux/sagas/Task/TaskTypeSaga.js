import { call, put, takeLatest } from "redux-saga/effects";
import { taskTypeService } from "../../../services/Task/TaskTypeService";
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../../constants/Task/TaskTypeConstant";

function* getAllTaskTypeSaga(action) {
  
  try {
    
    const { data, status } = yield call(() =>
      taskTypeService.getAllTaskProject()
    );

    console.log("data",data.content);

    yield put({
        type: GET_ALL_TASK_TYPE,
        arrTaskType :data.content,
    })
    
  } catch (err) {
    console.log(err);
  }
}

export function* watcherGetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA,getAllTaskTypeSaga)
}
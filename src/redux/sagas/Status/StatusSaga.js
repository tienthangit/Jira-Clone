import { delay, put, takeLatest, call } from "redux-saga/effects";
import {statusService} from "../../../services/Status/StatusService"
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from "../../constants/Status/StatusConstant";

function* getAllStatusSaga(action) {
  console.log(action.taskObject);
  try {
    const { data, status } = yield call(() =>  statusService.getAllStatus());

    yield put({
        type: GET_ALL_STATUS,
        arrStatus : data.content,
    })
    
  } catch (err) {
    console.log(err);
    console.log(err.response?.data)
  }

}

export function* watcherGetAllStatusSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}

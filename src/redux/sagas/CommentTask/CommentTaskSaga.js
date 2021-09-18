import { call, put, select, takeLatest } from "redux-saga/effects";
import { commentService } from "../../../services/Comment/CommentTaskService";
import { ADD_COMMENT_TASK_SAGA, DELETE_COMMENT_TASK_SAGA, GET_ALL_COMMENT_TASK, GET_ALL_COMMENT_TASK_SAGA, UPDATE_COMMENT_TASK_SAGA} from "../../constants/CommentTask/CommentTaskConstant"

//get 
function* getAllCommentTaskSaga(action) {
    // console.log('commentaction',action)
    const {taskId} =  yield select((state) => state.TaskReducer.taskDetailModal) 

    try {
        const {data} = yield commentService.getCommentTask(taskId);
        
        console.log("dataComment",data)
        yield put({
            type: GET_ALL_COMMENT_TASK,
            commentList : data?.content,
        })
    } catch(err) {
        console.log(err);
    }

}

export function* watcherGetAllCommentTaskSaga(){
    yield takeLatest(GET_ALL_COMMENT_TASK_SAGA,getAllCommentTaskSaga)
} 

// Add
function* addCommentTaskSaga(action) {
    const { commentTask } = action;

    // console.log("commentTask",action);
    try {
        const { data } = yield commentService.addCommentTask(commentTask)
        
        console.log("data",data)

        yield put({
            type: GET_ALL_COMMENT_TASK_SAGA
        })

    } catch(err) {
        console.log(err.response?.data);

    }

}

export function* watcherAddCommentTaskSaga() {
  yield takeLatest(ADD_COMMENT_TASK_SAGA,addCommentTaskSaga)
}

//Delete 
function* deleteCommentTaskSaga(action) {
    const { commentId } = action;

    try {
        const { data } = yield commentService.deleteCommentTask(commentId);
        
        yield put({
            type: GET_ALL_COMMENT_TASK_SAGA,
        })
    } catch(err) {
        console.log(err);
    }
}

export function* watcherDeleteCommentTaskSaga() {
    yield takeLatest(DELETE_COMMENT_TASK_SAGA,deleteCommentTaskSaga)
}

//Update
function* updateCommentTaskSaga(action) {
    const { commentId, commentContent} = action;

    try {
        const { data } = yield commentService.updateCommentTask(commentId,commentContent)

        yield put({
            type: GET_ALL_COMMENT_TASK_SAGA,
        })
    } catch(err) {

    }
}

export function* watcherUpdateCommentTaskSaga() {
    yield takeLatest(UPDATE_COMMENT_TASK_SAGA,updateCommentTaskSaga)
}
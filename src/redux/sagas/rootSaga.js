import { all } from "redux-saga/effects"
import * as UserSaga from "./User/UserSaga"
import * as UserCyberBugs from "./User/UserCyberBugsSaga"
// import * as ProjectCategorySaga from "./Cyberbugs/ProjectCategorySaga";
import * as ProjectSaga from "./Project/ProjectSaga";
import * as TaskTypeSaga from "./Task/TaskTypeSaga";
import * as PrioritySaga from "./Priority/PrioritySaga";
import * as TaskSaga from "./Task/TaskSaga";
import * as StatusSaga from "./Status/StatusSaga";
import * as CommentTaskSaga from "./CommentTask/CommentTaskSaga"


export function* rootSaga() {

  yield all([
    //User
    UserSaga.watcherSignUp(),
    UserSaga.watcherSignin(),
    //User CyberBugs
    UserCyberBugs.watcherRemoveUserProject(),
    UserCyberBugs.watcherAddUserProject(),
    UserCyberBugs.watcherGetUser(),
    UserCyberBugs.watcherGetUserByProjectIdSaga(),
    //Project 
    ProjectSaga.watcherCreateProjectSaga(),
    ProjectSaga.watcherGetAllProjectCategory(),
    ProjectSaga.watcherGetListProjectSaga(),
    ProjectSaga.watcherDeleteProjectSaga(),
    ProjectSaga.watcherUpdateProjectSaga(),
    ProjectSaga.watcherGetProjectAllSaga(),
    ProjectSaga.watcherGetProjectDetailSaga(),
    //Task 
    TaskTypeSaga.watcherGetAllTaskTypeSaga(),
    //Priority 
    PrioritySaga.watcherGetAllPrioritySaga(),
    //Status
    StatusSaga.watcherGetAllStatusSaga(),
    //Task
    TaskSaga.watcherCreateTaskSaga(),
    TaskSaga.watcherUpdateTaskStatusSaga(),
    TaskSaga.watcherGetTaskDetailSaga(),
    TaskSaga.watcherHandleChangePostAPI(),
    //CommentTask
    CommentTaskSaga.watcherGetAllCommentTaskSaga(),
    CommentTaskSaga.watcherAddCommentTaskSaga(),
    CommentTaskSaga.watcherDeleteCommentTaskSaga(),
    CommentTaskSaga.watcherUpdateCommentTaskSaga(),
  ]);
}

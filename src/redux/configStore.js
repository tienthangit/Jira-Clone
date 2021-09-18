import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from "redux-thunk";
import UserReducer from "./reducer/User/UserReducer";
import UserCyberBugsReducer from "./reducer/User/UserCyberBugsReducer";
import LoadingReducer from "./reducer/Loading/Loading";
import ModalReducer from "./reducer/Modal/ModalReducer";
import DrawerCyberBugsReducer from "./reducer/Drawer/DrawerCyberBugsReducer";
import ProjectReducer from "./reducer/Project/ProjectReducer";
import ProjectCategoryReducer from "./reducer/Project/ProjectCategoryReducer";
import ProjectCyberBugsReducer from "./reducer/Project/ProjectCyberBugsReducer";
import TaskTypeReducer from "./reducer/Task/TaskTypeReducer";
import PriorityReducer from "./reducer/Priority/PriorityReducer"
import StatusReducer from "./reducer/Status/StatusReducer"
import TaskReducer from "./reducer/Task/TaskReducer"
import CommentTaskReducer from "./reducer/CommentTask/CommentTaskReducer"
//Middleware saga
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";

// Dev tools
import { composeWithDevTools } from "redux-devtools-extension";

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  // reducer khai báo tại đây
  ModalReducer,
  LoadingReducer,
  //User
  UserReducer,
  UserCyberBugsReducer,
  //Project
  ProjectReducer,
  ProjectCategoryReducer,
  ProjectCyberBugsReducer,
  //Drawer
  DrawerCyberBugsReducer,
  // Task
  TaskTypeReducer,
  TaskReducer,
  // Priority
  PriorityReducer,
  //Status
  StatusReducer,
   //Comment
   CommentTaskReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk, middleWareSaga))
);

// gọi saga
middleWareSaga.run(rootSaga);

export default store;

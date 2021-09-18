import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_TASK_DETAIL,
  REMOVE_USER_ASSIGN,
} from "../../constants/Task/TaskConstant";

const initialState = {
  taskDetailModal: {
    priorityTask: {},
    taskTypeDetail: {},
    assigness: [],
    lstComment: [],
    taskId: 766,
    taskName: "",
    alias: "",
    description: "",
    statusId: "",
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    typeId: 0,
    priorityId: 0,
    projectId: 0,
  },
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL:
      return { ...state, taskDetailModal: action.taskDetailModal };

    case CHANGE_TASK_MODAL: {
      const { name, value } = action;

      return {
        ...state,
        taskDetailModal: { ...state.taskDetailModal, [name]: value },
      };
    }

    case CHANGE_ASSIGNESS: {
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness,
        action.userSelected,
      ];
      return { ...state };
    }

    case REMOVE_USER_ASSIGN: {
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness.filter(
          (us) => us.id !== action.userId
        ),
      ];
      return { ...state };
    }

    default:
      return state;
  }
};

export default TaskReducer;
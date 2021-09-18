import {GET_ALL_PRIORITY}  from "../../constants/Priority/PriorityConstant"

const initialState = {
  arrPriority: [],
};

 const PriorityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRIORITY:
      return { ...state, arrPriority: action.arrPriority };

    default:
      return state;
  }
};

export default PriorityReducer;
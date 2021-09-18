import { GET_ALL_COMMENT_TASK } from "../../constants/CommentTask/CommentTaskConstant";

const initialState = {
    commentList: [],
};

const CommentTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENT_TASK:
      return { ...state, commentList: action.commentList };
    
    default:
      return state;
  }
};

export default CommentTaskReducer;

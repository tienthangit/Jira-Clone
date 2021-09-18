import {
  EDIT_PROJECT,
  PUT_PROJECT_DETAIL,
} from "../../constants/Project/ProjectConstant";

const initialState = {
  projectEdit: {
    id: 0,
    projectName: "",
    creator: 0,
    description: "",
    categoryId: "",
  },
  projectDetail: {},
};

const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT:
      console.log();
      return { ...state, projectEdit: action.projectEditModal };

    case PUT_PROJECT_DETAIL:
      state.projectDetail = action.projectDetail;
      return { ...state };

    default:
      return state;
  }
};

export default ProjectReducer
import { GET_ALL_PROJECT_CATEGORY } from "../../constants/Project/ProjectConstant";

const stateDefault = {
  arrProjectCategory: [],
};

const ProjectCategoryReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGORY:
      return { ...state, arrProjectCategory: action.data };

    default:
      return { ...state };
  }
};

export default ProjectCategoryReducer;

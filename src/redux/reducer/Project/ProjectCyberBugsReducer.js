import { GET_ALL_PROJECT, GET_ALL_PROJECT_CATEGORY_SAGA, GET_LIST_PROJECT } from "../../constants/Project/ProjectConstant";


const stateDefault = {
  projectList: [], // Show list project in Projectmanagement pages
  arrProject: [], //allproject For dropdown in CreateTask
};

 const ProjectCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {

    case GET_LIST_PROJECT: {
      return { ...state,projectList : action.projectList};
    }

    case GET_ALL_PROJECT : {
      return {...state, arrProject: action.arrProject };
    }
    default:
      return { ...state };
  }
};

export default ProjectCyberBugsReducer;
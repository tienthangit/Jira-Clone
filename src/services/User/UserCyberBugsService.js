import { baseService } from "../config/baseService";

export class UserCyberBugService extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  getUser = (keyword) => {
    return this.get(`Users/getUser?keyword=${keyword}`);
  };

  assignUserProject = (userProject) => {
    return this.post(`Project/assignUserProject`, userProject);
  };

  deleteUserFromProject = (userProject) => {
    return this.post(`Project/removeUserFromProject`, userProject);
  };

  getUserByProjectId = (idProject) =>{
    return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
  }

}

export const userCyberBugService = new UserCyberBugService();

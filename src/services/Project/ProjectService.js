import { baseService } from "../config/baseService";

export class ProjectServie extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  //create
  createProject = (newProject) => {
    return this.post(`Project/createProject`, newProject);
  };
  createProjectAuthorization = (newProject) => {
    return this.post(`Project/createProjectAuthorize`, newProject);
  };

  //Category
  getAllProjectCategory = () => {
    return this.get(`ProjectCategory`) 
  }

  //List project
  getListProject = () => {
      return this.get(`Project/getAllProject`)
  }

  // update
  updateProject = (projectUpdate) => {
      return this.put(`Project/updateProject?projectId=${projectUpdate.id}`,projectUpdate)
  }

  //delete
  deleteProject = (id) => {
    return this.delete(`Project/deleteProject?projectId=${id}`);
  };

  //get all project for createtask
  getAllProject = () => {
    return this.get(`Project/getAllProject`);
  };

  //get project detail
  getProjectDetail = (projectId) => {
    return this.get(`Project/getProjectDetail?id=${projectId}`);
  };
}

export const projectServie =  new ProjectServie();
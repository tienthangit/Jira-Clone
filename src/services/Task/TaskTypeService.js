import { baseService } from "../config/baseService";

export class TaskTypeService extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  getAllTaskProject = () => {
    return this.get("TaskType/getAll");
  };
}

export const taskTypeService = new TaskTypeService();
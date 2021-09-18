import { baseService } from "../config/baseService";

export class PriorityService extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  getAllPriority = () => {
    return this.get("Priority/getAll");
  };
}

export const priorityService = new PriorityService();

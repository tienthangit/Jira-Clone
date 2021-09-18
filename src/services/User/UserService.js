import React from "react";
import { baseService } from "../config/baseService";

export class UserService extends baseService {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  signupUser = (userInfo) => {
    return this.post(`Users/signup`, userInfo);
  };

  signinUser = (userLogin) => {
    return this.post(`/users/signin`, userLogin);
  };

  
}

export const userService = new UserService();

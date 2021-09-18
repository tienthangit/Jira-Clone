import { notification } from "antd";

export const notifiFunction = (type, message, description) => {
  notification[type]({
    // success ,info, warning, err
    message,
    description,    
    duration: 2,
  });
};

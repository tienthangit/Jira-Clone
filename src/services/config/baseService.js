import { DOMAIN_CYBERBUG } from "../../utility/System/settingSystem";
import { request } from "./config";

export class baseService {
  //put JSON về phí backend
  put = (url, model) => {
    return request({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "PUT",
      data: model,
    });
  };

  post = (url, model) => {
    return request({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "POST",
      data: model,
    });
  };

  get = (url) => {
    return request({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "GET",
    });
  };

  delete = (url) => {
    return request({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "DELETE",
    });
  };

}

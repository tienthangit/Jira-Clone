import axios from "axios";
import { TOKEN } from "../../utility/System/settingSystem";

export const request = ({...restParam}) => {
  const variables = {...restParam};
  return axios(variables);
};

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      
    }
    // config.headers["content-type"] = "application/json;charset=utf-8";
    console.log(config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

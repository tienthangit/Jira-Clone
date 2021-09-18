import { Route } from "react-router";
import "../../index.css";
import { TOKEN } from "../../utility/System/settingSystem";
import Siderbar from "../../components/Siderbar";
import Menu from "../../components/Menu";
import ModalTask from "../../components/ModalTask";
import { Redirect } from "react-router-dom";

const createPrivateRoute = (condition) => {
  //hook ẩn danh
  return function Index(props) {
    const { Component, redirectPath, ...restParam } = props;
    return (
      <Route
        {...restParam}
        render={(propsRoute) => {
          if (condition()) {
            return (
              <>
                <div className="jira">
                  <Siderbar></Siderbar>
                  <Menu></Menu>
                  <Component {...propsRoute}></Component>
                </div>
              </>
            );
          } else {
            return <Redirect to={redirectPath}></Redirect>;
          }
        }}
      ></Route>
    );
  };
};

export const CyberbugsTemplate = createPrivateRoute(
  () => localStorage.getItem(TOKEN)
);

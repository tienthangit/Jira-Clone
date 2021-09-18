import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { Layout } from "antd";
import { TOKEN } from "../../utility/System/settingSystem";

const { Sider, Content } = Layout;

const createAuthRoute = (condition) => {
  // Hook ẩn danh
  return function Index(props) {
    let { Component, redirectPath, ...restRoute } = props;

    const [{ width, height }, setSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      window.onresize = () => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
    }, []);

    return (
      <Route
        {...restRoute}
        render={(propsRoute) => {
          if (condition()) {
            return (
              <Layout>
                <Sider
                  width={Math.round(width / 2)}
                  style={{
                    height: height,
                    backgroundImage: `url(https://picsum.photos/500)`,
                    backgroundSize: "100%",
                  }}
                ></Sider>
                <Content>
                  <Component {...propsRoute}></Component>
                </Content>
              </Layout>
            );
          } else {
            return <Redirect to={redirectPath}></Redirect>;
          }
        }}
      ></Route>
    );
  };
};

export const UserLoginTemplate = createAuthRoute(() =>
  !localStorage.getItem(TOKEN)
);

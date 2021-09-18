import React, { useState } from "react";
import { Layout, Menu, Dropdown } from "antd";
import {
  BarsOutlined,
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { OPEN_FORM_CREATE_TASK } from "../../redux/constants/Drawer/DrawerConstant";
import FormCreateTask from "../Form/FormCreateTask";
import { TOKEN, USER_LOGIN } from "../../utility/System/settingSystem";
import { history } from "../../utility/History/history";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../redux/constants/Loading/LoadingConstant";
import { NavLink } from "react-router-dom";


const { Sider } = Layout;

export default function Sidebar(props) {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  //Log out
  const logOut = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_LOGIN);
    setTimeout(() => {
      history.push("/login");
    },1000)
    
  };

  const { SubMenu } = Menu;

  return (
    <Layout>
      <Sider collapsible collapsed={state.collapsed} trigger={null}>
        <div className="text-right pr-2" onClick={toggle}>
          <BarsOutlined
            style={{ cursor: "pointer", color: "#fff", fontSize: "20px" }}
          />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu key="sub1" icon={<UserOutlined />} title="Account">
            <Menu.Item key="3">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  logOut()
                 
                  // dispatch({ type: DISPLAY_LOADING });
                  // dispatch({ type: HIDE_LOADING });

                }}
              >
                Logout
              </div>
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            key="1"
            icon={<PlusOutlined style={{ fontSize: 20 }} />}
            onClick={() => {
              dispatch({
                type: OPEN_FORM_CREATE_TASK,
                Component: <FormCreateTask></FormCreateTask>,
                title: "Create Task",
              });
            }}
          >
            <span> Create task</span>
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: 20 }} />}>
            Search
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
}

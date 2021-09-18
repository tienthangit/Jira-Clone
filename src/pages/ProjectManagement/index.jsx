import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Space, Popover, AutoComplete } from "antd";
import parse from "html-react-parser";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  FormOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import FormEditProject from "../../../components/Forms/FormEditProject/FormEditProject";

//Antd
import { Tag, Divider, Popconfirm, Avatar } from "antd";
import { DELETE_PROJECT_SAGA, EDIT_PROJECT, GET_ALL_PROJECT_CATEGORY_SAGA, GET_LIST_PROJECT_SAGA } from "../../redux/constants/Project/ProjectConstant";
import { ADD_USER_PROJECT_API, GET_USER_API_SAGA, REMOVE_USER_PROJECT_API } from "../../redux/constants/User/UserCyberBugsConstant";
import { OPEN_FORM_EDIT_PROJECT } from "../../redux/constants/Drawer/DrawerConstant";
import FormEditProject from "../../components/Form/FormEditTask";

export default function ProjectManagement() {
  //Lấy dữ liêu từ reducer về component
  const {projectList} = useSelector(
    (state) => state.ProjectCyberBugsReducer
  );

  const { userSearch } = useSelector(
    (state) => state.UserCyberBugsReducer
  );
  
  const [value, setValue] = useState("");

  const searchRef = useRef(null);
  //Sử dụng useDispatch để gọi action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_LIST_PROJECT_SAGA });
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
  }, []);

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirections: ["descend"],
    },
    {
      title: "ProjectName",
      dataIndex: "projectName",
      key: "projectName",
      render: (text,record,index) => {
        return <NavLink to={`/projectdetail/${record.id}`}>
          {text}
        </NavLink>
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        } else {
          return 1;
        }
      },
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "category",
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        } else {
          return 1;
        }
      },
    },
    {
      title: "creator",
      // dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        } else {
          return 1;
        }
      },
    },
    {
      title: "members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  title="members"
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>avatar</th>
                            <th>name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    src={item.avatar}
                                    width="30"
                                    height="30"
                                    style={{ borderRadius: "15px" }}
                                    alt="avatar"
                                  ></img>{" "}
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: REMOVE_USER_PROJECT_API,
                                        userProject: {
                                          projectId: record.id,
                                          userId: item.userId,
                                        },
                                      });
                                    }}
                                    className="btn btn-danger"
                                    style={{ borderRadius: "50%" }}
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar
                    key={index}
                    src={member.avatar}
                    className="mr-1"
                  ></Avatar>
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="topLeft"
              title={"Add user"}
              content={() => {
                return (
                  <AutoComplete
                    options={userSearch.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(valueSelect, option) => {
                      //set Giá trị của hộp thoại = option.label
                      setValue(option.label);
                      //Gọi API gửi về backend
                      dispatch({
                        type: ADD_USER_PROJECT_API,
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    style={{ width: "100%" }}
                    onSearch={(value) => {
                      if(searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({ type: GET_USER_API_SAGA, keyword: value });
                      },300);
                    }}
                  >
                    a
                  </AutoComplete>
                );
              }}
              trigger="click"
            >
              <Button>+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <button
              className="btn mr-2 btn-primary"
              onClick={() => {
                dispatch({type:"OPEN_DRAWER"})
                const action = {
                  type: OPEN_FORM_EDIT_PROJECT,
                  title:"Edit Project",
                  Component: <FormEditProject></FormEditProject>,
                };
                // dispatch lên reducer nội dung Drawer
                dispatch(action);
                // dispatc DL dòng hiện tại lên reducer
                const actionEditProject = {
                  type: EDIT_PROJECT,
                  projectEditModal: record,
                };
                dispatch(actionEditProject);
              }}
            >
              <FormOutlined style={{ fontSize: 17 }} />
            </button>
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => {
                dispatch({
                  type: DELETE_PROJECT_SAGA,
                  idProject: record.id,
                });
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
              onClick={() => {}}
            >
              <button className="btn mr-2 btn-danger">
                <DeleteOutlined style={{ fontSize: 17 }} />
              </button>
            </Popconfirm>
            ,
          </Space>
        );
      },
    },
  ];

  return (
    <div className="container-fluid mt-5">
      <h3>Project Management</h3>

      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}

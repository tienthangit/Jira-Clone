import React, { Fragment, useState } from "react";
import { Modal, Button, Input, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { UserOutlined, LockOutlined, TwitterOutlined } from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch, useSelector } from "react-redux";
import Signup from "../../components/Signup";
import { USER_LOGIN_API } from "../../redux/constants/User/UserConstant";
import createAction from "../../redux/actions";
import { HANDLE_MODAL } from "../../redux/constants/Modal/ModalConstant";
// import { USER_SIGNIN_API } from "../../../redux/constants/Cyberbugs/Cyberbugs";
// import { signinCyberbugAction } from "../../../redux/action/CyberbugAction";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

function Login(props) {
  //Modal
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const { isModal } = useSelector((state) => state.ModalReducer);
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(createAction(HANDLE_MODAL,true));
  };

  const handleCancel = () => {
    dispatch(createAction(HANDLE_MODAL,false));
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        className="container"
        style={{ height: window.innerHeight }}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: window.innerHeight }}
        >
          <h3 className="text-center" style={{ fontWeight: "300" }}>
            Login CyberBugs
          </h3>
          <div className="d-flex mt-3">
            <Input
              name="email"
              size="large"
              icon={<IconFont type="icon-facebook" />}
              style={{ width: "100%", minWidth: 300 }}
              placeholder="Email"
              prefix={<UserOutlined />}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {touched.email && <div className="text-danger">{errors.email}</div>}

          <div className="d-flex mt-3">
            <Input.Password
              name="password"
              type="password"
              size="large"
              style={{ width: "100%", minWidth: 300 }}
              placeholder="Password"
              prefix={<LockOutlined />}
              onChange={handleChange}
              onBlur={handleBlur}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          {touched.password && (
            <div className="text-danger">{errors.password}</div>
          )}

          <Button
            size="large"
            htmlType="submit"
            style={{
              minWidth: 300,
              backgroundColor: "rgb(102,117,223)",
              color: "#fff",
            }}
            className="mt-3 mb-2"
          >
            Login
          </Button>
          <Button
            type="primary"
            htmlType="button"
            className="mb-2"
            onClick={showModal}
          >
            Create an account
          </Button>
          <div className="social mt-3 d-flex ">
            <Button
              type="primary"
              htmlType="button"
              shape="circle"
              size={"large"}
              icon={<IconFont type="icon-facebook" />}
            />

            <Button
              type="primary ml-3"
              htmlType="button"
              shape="circle"
              icon={<TwitterOutlined />}
              size={"large"}
            />
          </div>
        </div>
      </form>
      {/* Hiện form đăng ký */}
      
        <Modal
          title="Signup"
          visible={isModal}
          onCancel={handleCancel}
          footer={null}
        >
          <Signup></Signup>
        </Modal>
      
    </Fragment>
  );
}

const LoginCyberBugsWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("Email is invalid!"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "password must have min 6 characters")
      .max(32, "password must have max 32 characters"),
  }),

  validateOnMount: true,

  handleSubmit: (values, { props, setSubmitting }) => {
    // dispatch Saga
    props.dispatch({ type: USER_LOGIN_API, userLogin: values });
  },

  displayName: "Login CyberSoft",
})(Login);

export default connect()(LoginCyberBugsWithFormik);

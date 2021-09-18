import React, { useCallback, useEffect } from "react";
import { Button, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { USER_SIGNUP_SAGA } from "../../redux/constants/User/UserConstant";
import createAction from "../../redux/actions/index"
import { HANDLE_MODAL } from "../../redux/constants/Modal/ModalConstant";
const { Text } = Typography;

const validationSchema = Yup.object().shape({
  // Form đăng nhập
  email: Yup.string().required("Email is required!").email("Email is invalid!"),
  passWord: Yup.string()
    .required("Password is required!")
    .min(6, "Password must have min 6 characters")
    .max(32, "Password must have max 32 characters"),
  name: Yup.string().required("Name is required!"),
  phoneNumber: Yup.string()
    .required("Phone is required!")
    .matches(/^[0-9]+$/, "This is not number")
    .min(10, "This phone is not valid!")
    .max(11, "This phone is not valid!"),
});

function Signup(props) {
  const dispatch = useDispatch();
  const { isModal } = useSelector(state => state.ModalReducer)
  //Close Modal
 
  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    validationSchema,
    // onBlur khi nhập xong sẽ kiểm tra
    validateOnMount: true,
  });
  const { values, touched, errors, handleChange, handleBlur } = formik;

  const setAllTouched = useCallback(() => {
    Object.keys(formik.values).forEach((key) => {
      formik.setFieldTouched(key);
    });
  }, [formik]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setAllTouched();
      if (!formik.isValid) return;

      // console.log("values",values)
      // console.log("values",values);
      dispatch({type: USER_SIGNUP_SAGA, userInfo : values});
    },
    [formik]
  );

  // console.log(values);
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          type="input"
          values={values.email}
          className="form-control"
          name="email"
          placeholder="Type your email"
        />
        {touched.email && <Text type="danger">{errors.email}</Text>}
      </div>
      <div className="form-group">
        <label>Password</label>

        <Input.Password
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control"
          name="passWord"
          values={values.passWord}
          placeholder="Type your password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        {touched.passWord && <Text type="danger">{errors.passWord}</Text>}
      </div>
      <div className="form-group">
        <label>Name</label>
        <Input
          onChange={handleChange}
          values={values.name}
          onBlur={handleBlur}
          className="form-control"
          name="name"
          placeholder="Type your name"
        />
        {touched.name && <Text type="danger">{errors.name}</Text>}
      </div>
      <div className="form-group">
        <label>Phone</label>
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          values={values.phoneNumber}
          className="form-control"
          name="phoneNumber"
          placeholder="Type your number"
        />
        {touched.phoneNumber && <Text type="danger">{errors.phoneNumber}</Text>}
      </div>
      <div className="ant-modal-footer">
        <Button
          onClick={() => {
            dispatch(createAction(HANDLE_MODAL,false))
          }}
          className="ant-btn"
          htmlType="button"
        >
          Cancel
        </Button>
        <Button htmlType="submit" className="ant-btn ant-btn-primary">
          Register
        </Button>
      </div>
    </form>
  );
}

export default Signup;

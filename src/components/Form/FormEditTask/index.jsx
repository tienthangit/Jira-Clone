import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import * as Yup from "yup";
import { SET_SUBMIT_EDIT_PROJECT } from "../../../redux/constants/Drawer/DrawerConstant";
import { UPDATE_PROJECT_SAGA } from "../../../redux/constants/Project/ProjectConstant";

function FormEditProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  const [state, setstate] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    // Gọi api load project category
    // dispatch({type})

    //Load sự kiện submit lên drawer nút submit
    dispatch({ type: SET_SUBMIT_EDIT_PROJECT, submitFunction: handleSubmit });
  }, []);



  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input
              value={values.id}
              disabled={true}
              className="form-control"
              name="id"
            ></input>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input
              value={values.projectName}
              className="form-control"
              name="projectName"
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select
              name="categoryId"
              className="form-control"
              onChange={handleChange}
            >
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="description123"
              // initialValue={values.description}
              value={values.description}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

const EditProjectForm = withFormik({
  // thuộc tính binding lại object khi render lại
  enableReinitialize: true,

  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      //Từ redux và root
      id: projectEdit?.id,
      projectName: projectEdit?.projectName,
      description: projectEdit?.description,
      categoryId: projectEdit?.categoryId,
    };
  },
  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    // Khi người dùng bấm submit => đưa DL về backend thông qua API
    //Gọi saga
    props.dispatch({
      type: UPDATE_PROJECT_SAGA,
      projectUpdate: values,
    });
  },

  displayName: "EditProjectForm",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});

export default connect(mapStateToProps)(EditProjectForm);

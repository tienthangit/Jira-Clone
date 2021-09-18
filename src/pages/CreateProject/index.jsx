import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import {
  CREATE_PROJECT_SAGA,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../redux/constants/Project/ProjectConstant";

function CreateProject(props) {
  //Tiny

  //Formik
  const { arrProjectCategory } = useSelector(
    (state) => state.ProjectCategoryReducer
  );
  const dispatch = useDispatch();

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
  }, []);

  return (
    <div className="form-control">
      <h3 className="text-center">Create Project</h3>
      <form
        className="container"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description</p>
          <Editor
            // onInit={(evt, editor) => (editorRef.current = editor)}
            textareaName="description"
            initialValue=""
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
        <div className="form-group">
          <select
            name="categoryId"
            className="form-control"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-outline-primary" type="submit">
          Create project
        </button>
      </form>
    </div>
  );
}

const createProjectForm = withFormik({
  // thuộc tính binding lại object khi render lại
  enableReinitialize: true,

  mapPropsToValues: (props) => {
    return {
      //Từ redux và root
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id,
    };
  },
  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: CREATE_PROJECT_SAGA,
      newProject: values,
    });
  },

  displayName: "CreateProjectFormik",
})(CreateProject);

const mapStateToProps = (state) => ({
  arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
});

export default connect(mapStateToProps)(createProjectForm);

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "html-react-parser";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "antd";
import { GET_ALL_STATUS_SAGA } from "../../redux/constants/Status/StatusConstant";
import { GET_ALL_PRIORITY_SAGA } from "../../redux/constants/Priority/PriorityConstant";
import { GET_ALL_TASK_TYPE_SAGA } from "../../redux/constants/Task/TaskTypeConstant";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
} from "../../redux/constants/Task/TaskConstant";
import {
  ADD_COMMENT_TASK_SAGA,
  DELETE_COMMENT_TASK_SAGA,
  GET_ALL_COMMENT_TASK_SAGA,
  UPDATE_COMMENT_TASK_SAGA,
} from "../../redux/constants/CommentTask/CommentTaskConstant";
import { USER_LOGIN } from "../../utility/System/settingSystem";

const { Option } = Select;

export default function ModalTask(props) {
  const { taskDetailModal } = useSelector((state) => state.TaskReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const { commentList } = useSelector((state) => state.CommentTaskReducer);
  const [visibleEditor, setVisibleEditor] = useState(false); // Description
  const [addCommentVisibleEditor, setAddCommentVisibleEditor] = useState(false);
  const [editCommentVisibleEditor, setEditCommentVisibleEditor] = useState({
    visible: false,
    index: 0,
  });
  const [historyContent, setHistoryContent] = useState(
    taskDetailModal.description
  );
  // Get info userlogin 
  const user_login = JSON.parse(localStorage.getItem(USER_LOGIN));

  const [content, setContent] = useState(taskDetailModal.description);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    dispatch({ type: GET_ALL_COMMENT_TASK_SAGA });
  }, []);

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              // onInit={(evt, editor) => (editorRef.current = editor)}
              name="description"
              initialValue={taskDetailModal.description}
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
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: content,
                });

                setVisibleEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: content,
                });
                setVisibleEditor(false);
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              setHistoryContent(taskDetailModal.description);
              setVisibleEditor(!visibleEditor);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const renderAddComment = () => {
    return (
      <div>
        {addCommentVisibleEditor ? (
          <div>
            <Editor
              // onInit={(evt, editor) => (editorRef.current = editor)}
              name="description"
              init={{
                height: 150,
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
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: ADD_COMMENT_TASK_SAGA,
                  commentTask: {
                    taskId: taskDetailModal.taskId,
                    contentComment: content,
                  },
                  //  actionType: CHANGE_TASK_MODAL,
                  //  name: "description",
                  //  value: content,
                });

                setAddCommentVisibleEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                //  dispatch({
                //    type: HANDLE_CHANGE_POST_API_SAGA,
                //    actionType: CHANGE_TASK_MODAL,
                //    name: "description",
                //    value: content,
                //  });
                setAddCommentVisibleEditor(false);
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <input
            type="text"
            placeholder="Add a comment ..."
            onClick={() => {
              setAddCommentVisibleEditor(!addCommentVisibleEditor);
            }}
          />
        )}
      </div>
    );
  };

  const renderEditComment = (commentDescription, commentId) => {
    return (
      <div>
        <Editor
          // onInit={(evt, editor) => (editorRef.current = editor)}
          name="description"
          initialValue={commentDescription}
          init={{
            width: "100%",
            height: 150,
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
          onEditorChange={(content, editor) => {
            setContent(content);
          }}
        />
        <button
          className="btn btn-primary m-2"
          onClick={() => {
            // console.log(content, commentId);
            dispatch({
              type: UPDATE_COMMENT_TASK_SAGA,
              commentId: commentId,
              commentContent: content,
            });
            setEditCommentVisibleEditor(false);
          }}
        >
          Save
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => {
            setEditCommentVisibleEditor(false);
          }}
        >
          Close
        </button>
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: HANDLE_CHANGE_POST_API_SAGA,
      actionType: CHANGE_TASK_MODAL,
      name,
      value,
    });
  };

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = (Number(timeTrackingSpent) / max) * 100;
    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className="logged">{Number(timeTrackingSpent)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h estimated
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChange}
            ></input>
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Search Modal */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="searchModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-search">
          <div className="modal-content">
            <div className="modal-header">
              <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>RECENT ISSUES</p>
              <div style={{ display: "flex" }}>
                <div className="icon">
                  <i className="fa fa-bookmark" />
                </div>
                <div>
                  <p>cyberlearn</p>
                  <p>BUG-238066</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Info Modal */}
      <div
        className="modal fade"
        id="infoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="infoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-info">
          <div className="modal-content">
            <div className="modal-header">
              <div className="task-title">
                <i className="fa fa-bookmark" />
                <select
                  name="typeId"
                  value={taskDetailModal.typeId}
                  onChange={handleChange}
                >
                  {arrTaskType?.map((tp, index) => {
                    return (
                      <option key={index} value={tp.id}>
                        {tp.taskType}
                      </option>
                    );
                  })}
                </select>
                <span>{taskDetailModal.taskName}</span>
              </div>
              <div style={{ display: "flex" }} className="task-click">
                <div>
                  <i className="fab fa-telegram-plane" />
                  <span style={{ paddingRight: 20 }}>Give feedback</span>
                </div>
                <div>
                  <i className="fa fa-link" />
                  <span style={{ paddingRight: 20 }}>Copy link</span>
                </div>
                <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-8">
                    <p className="issue">This is an issue of type: Task.</p>
                    <div className="description">
                      <h5 onClick={() => {
                        setVisibleEditor(!visibleEditor);
                      }}>Description</h5>
                      {renderDescription()}
                    </div>
                    <div className="comment">
                      <h5>Comment</h5>
                      <div
                        className="block-comment"
                        style={{ display: "flex" }}
                      >
                        <div className="avatar">
                          <img src={user_login?.avatar} alt="avaProfile" />
                        </div>
                        <div className="input-comment mb-3">
                          {renderAddComment()}
                        </div>
                      </div>
                      <div className="lastest-comment">
                        <div className="comment-item">
                          {commentList.map((com, index) => {
                            return (
                              <div
                                key={index}
                                className="display-comment"
                                style={{ display: "flex", marginBottom: 10 }}
                              >
                                <div className="avatar">
                                  <img src={com.user.avatar} alt="avatar" />
                                </div>
                                <div className="w-100">
                                  <p
                                    style={{
                                      marginBottom: 5,
                                      fontWeight: "BOLD",
                                    }}
                                  >
                                    {com.user.name}
                                  </p>
                                  {editCommentVisibleEditor.index === index &&
                                  editCommentVisibleEditor.visible ? (
                                    renderEditComment(
                                      com.contentComment,
                                      com.id
                                    )
                                  ) : (
                                    <div style={{ marginBottom: 5 }}>
                                      {ReactHtmlParser(com.contentComment)}
                                    </div>
                                  )}

                                  <div>
                                    <span
                                      style={{
                                        color: "#929398",
                                        marginRight: 10,
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        setEditCommentVisibleEditor({
                                          visible: true,
                                          index,
                                        });
                                      }}
                                    >
                                      Edit
                                    </span>
                                    •
                                    <span
                                      style={{
                                        color: "#929398",
                                        marginLeft: 10,
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        dispatch({
                                          type: DELETE_COMMENT_TASK_SAGA,
                                          commentId: com.id,
                                        });
                                      }}
                                    >
                                      Delete
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="status">
                      <h6>STATUS</h6>
                      <select
                        name="statusId"
                        className="custom-select"
                        defaultValue={taskDetailModal.statusId}
                        onChange={handleChange}
                      >
                        {arrStatus?.map((status, index) => {
                          return (
                            <option key={index} value={status.statusId}>
                              {status.statusName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="assignees">
                      <h6>ASSIGNEES</h6>
                      <div className="row">
                        {taskDetailModal.assigness?.map((user, index) => {
                          return (
                            <div className="col-6 mt-2 mb-2 ">
                              <div
                                key={index}
                                style={{ display: "flex" }}
                                className="item"
                              >
                                <div className="avatar">
                                  <img src={user.avatar} alt={user.avatar} />
                                </div>
                                <p className="name mt-1 ml-1">
                                  {user.name}
                                  <i
                                    className="fa fa-times"
                                    style={{ marginLeft: 5, cursor: "pointer" }}
                                    onClick={() => {
                                      dispatch({
                                        type: HANDLE_CHANGE_POST_API_SAGA,
                                        actionType: REMOVE_USER_ASSIGN,
                                        userId: user.id,
                                      });
                                    }}
                                  />
                                </p>
                              </div>
                            </div>
                          );
                        })}
                        <div className="col-6 mt-2 mb-2">
                          <Select
                            style={{ width: "100%" }}
                            options={projectDetail.members
                              ?.filter((mem) => {
                                let index =
                                  taskDetailModal.assigness?.findIndex(
                                    (us) => us.id === mem.userId
                                  );
                                if (index !== -1) {
                                  return false;
                                }
                                return true;
                              })
                              .map((mem, index) => {
                                return { value: mem.userId, label: mem.name };
                              })}
                            optionFilterProp="label"
                            name="lstUser"
                            className="form-control"
                            value="+ Add more"
                            onSelect={(value) => {
                              if (value == "0") {
                                return;
                              }
                              let userSelected = projectDetail.members?.find(
                                (mem) => mem.userId == value
                              );
                              userSelected = {
                                ...userSelected,
                                id: userSelected.userId,
                              };

                              dispatch({
                                type: HANDLE_CHANGE_POST_API_SAGA,
                                actionType: CHANGE_ASSIGNESS,
                                userSelected,
                              });
                            }}
                          ></Select>
                        </div>
                      </div>
                    </div>

                    <div className="priority" style={{ marginBottom: 20 }}>
                      <h6>PRIORITY</h6>
                      <select
                        name="priorityId"
                        className="form-control"
                        onChange={handleChange}
                        defaultValue={taskDetailModal.priorityId}
                      >
                        {arrPriority?.map((item, index) => {
                          // console.log("itemPriority", item)
                          return (
                            <option key={index} value={item.priorityId}>
                              {item.priority}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="estimate">
                      <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                      <input
                        name="originalEstimate"
                        type="text"
                        className="estimate-hours"
                        value={taskDetailModal.originalEstimate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="time-tracking">
                      <h6>TIME TRACKING</h6>
                      {renderTimeTracking()}
                    </div>
                    <div style={{ color: "#929398" }}>
                      Create at a month ago
                    </div>
                    <div style={{ color: "#929398" }}>
                      Update at a few seconds ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

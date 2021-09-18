import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { GET_TASK_DETAIL_SAGA, UPDATE_STATE_TASK_SAGA } from "../../redux/constants/Task/TaskConstant";

export default function ContentMain(props) {
  const { projectDetail } = props;
  const dispatch = useDispatch();

//   console.log("projectDetail", projectDetail);

  const handleDragEnd = (result) => {
    console.log(result);
    let { projectId, taskId} = JSON.parse(result.draggableId); // Lấy ra chuỗi sau mỗi lần draggable
    let {source,destination} = result;

    if(!result.destination) {
      return
    }

    if(source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }
    // Gọi API cập nhật lại status
    dispatch({
      type :UPDATE_STATE_TASK_SAGA,
      taskUpdateStatus: {
        taskId,
        statusId: destination.droppableId,
        projectId,
      }
    })
  };

  const renderCardTaskList = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {projectDetail.lstTask?.map((taskListDetail, index) => {
          return (
            <Droppable key={index} droppableId={taskListDetail.statusId}>
              {(provided) => {
                return (
                  <div
                    key={index}
                    className="card pb-2"
                    style={{ width: "17rem", height: "auto" }}
                  >
                    <div className="card-header">
                      {taskListDetail.statusName}
                    </div>
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      key={index}
                      className="list-group list-group-flush" style = {{height:"100%"}}
                    >
                      {taskListDetail.lstTaskDeTail?.map((task, index) => {
                        return (
                          <Draggable
                            key={task.taskId.toString()}
                            index={index}
                            draggableId={JSON.stringify({projectId:task.projectId, taskId: task.taskId})}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  key={index}
                                  className="list-group-item"
                                  data-toggle="modal"
                                  data-target="#infoModal"
                                  // style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    dispatch({
                                      type: GET_TASK_DETAIL_SAGA,
                                      taskId: task.taskId,
                                    });
                                  }}
                                >
                                  <p className="font-weight-bold">
                                    {task.taskName}
                                  </p>
                                  <div
                                    className="block"
                                    style={{ display: "flex" }}
                                  >
                                    <div className="block-left">
                                      <p className="text-danger">
                                        {task.priorityTask.priority}
                                      </p>
                                    </div>
                                    <div className="block-right">
                                      <div
                                        className="avatar-group"
                                        style={{ display: "flex" }}
                                      >
                                        {task.assigness.map((mem, index) => {
                                          return (
                                            <div key={index} className="avatar">
                                              <img
                                                src={mem.avatar}
                                                alt={mem.avatar}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };

  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCardTaskList()}
    </div>
  );
}

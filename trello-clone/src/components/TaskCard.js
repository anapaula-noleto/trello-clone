// Create the TaskCard component here
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SubjectIcon from "@mui/icons-material/Subject";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
// Import reducers
import {
  setCurrTaskIdToEdit,
  setCurrColIdToEdit,
  setDialogStatus,
} from "./taskSlice";

function TaskCard({ currTaskColId, task, index }) {
  const { taskId, taskTitle, taskDescription } = task;

  const dispatch = useDispatch();

  function handleEditButtonClick() {
    dispatch(setCurrTaskIdToEdit({ taskId: task.id }));
    dispatch(setCurrColIdToEdit({ currTaskColId: currTaskColId }));
    dispatch(setDialogStatus(true));
  }

  return (
    <>
      <Draggable draggableId={taskId} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.dragHandleProps}
          >
            <Card
              key={index}
              cursor="pointer"
              style={{ marginBottom: "10px" }}
              variant="outlined"
            >
              <CardContent>
                <span style={{ fontSize: "16px", fontWeight: "700" }}>
                  {task.taskTitle}
                </span>
                <div className="task-title-edit-container">
                  <Tooltip title="Edit Details" placement="bottom-start">
                    <EditIcon
                      fontSize="small"
                      onClick={handleEditButtonClick}
                    />
                  </Tooltip>
                </div>
                <div>
                  {task.taskDescription !== "" ? (
                    <Tooltip
                      title={"This task has description."}
                      placement="bottom-start"
                    >
                      <SubjectIcon fontSize="small" cursor="pointer" />
                    </Tooltip>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default TaskCard;

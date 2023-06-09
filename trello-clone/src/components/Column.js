// Create the Column component here

import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";

function Column({ colId, index }) {
  const data = useSelector((state) => state.task);

  function RenderColumnTasks() {
    const currColTasks = data.columns[colId].taskIds.map(
      (taskId) => data.tasks[taskId],
    );

    return (
      <>
        {currColTasks.map((task, index) => {
          // Replace this with the TaskCard component later
          return (
            <TaskCard
              key={task.id}
              currTaskColId={colId}
              task={task}
              index={index}
            />
          );
        })}
      </>
    );
  }

  return (
    <>
      <Draggable draggableId={colId} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="column-container"
          >
            <div
              {...provided.dragHandleProps}
              className="task-title-edit-container"
            >
              <span className="column-title">{data.columns[colId].title}</span>
            </div>
            <Droppable droppableId={colId} type="task">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-list"
                >
                  <RenderColumnTasks />

                  {provided.placeholder}

                  {/* Add the TaskAddButton component here */}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default Column;

// Create the Board component here
import React, { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// Import the dataset
import dataset from "./dataset";

// Import redux functions and reducers
import { useDispatch, useSelector } from "react-redux";
import {
  setAllTasks,
  setAllColumns,
  setColumnOrder,
  dragTasksSameColumn,
  dragTasksDifferentColumn,
  dragColumns,
} from "./taskSlice";

import Column from "./Column";

function Board() {
  // It selects the task slice from the Redux store
  const data = useSelector((state) => state.task);
  const dispatch = useDispatch();

  /*
  This function will update the Redux state based on 
  the new positions of the dragged tasks within a column and between different columns.
  */
  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    //If there is no destination present
    if (!destination) {
      return;
    }

    //If columns are being dragged
    if (type === "column") {
      const colOrderNew = Array.from(data.columnOrder);
      colOrderNew.splice(source.index, 1);
      colOrderNew.splice(destination.index, 0, draggableId);

      dispatch(dragColumns(colOrderNew));
      return;
    }

    //If the source and destination is the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const src = data.columns[source.droppableId];
    const dst = data.columns[destination.droppableId];

    // If a task is dropped inside the same column
    if (src === dst) {
      const newTaskIds = Array.from(src.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...src,
        taskIds: newTaskIds,
      };

      dispatch(dragTasksSameColumn(updatedColumn));
      return;
    }

    // If a task is dropped in a different column
    const srcColId = src["id"];
    const srcTaskIds = Array.from(src.taskIds);
    srcTaskIds.splice(source.index, 1);

    const dstColId = dst["id"];
    const dstTaskIds = Array.from(dst.taskIds);
    dstTaskIds.splice(destination.index, 0, draggableId);

    dispatch(
      dragTasksDifferentColumn({
        srcColId: srcColId,
        srcTaskIds: srcTaskIds,
        dstColId: dstColId,
        dstTaskIds: dstTaskIds,
      }),
    );
  }

  //it initializes the Redux state by dispatching actions.
  useEffect(() => {
    console.log("oi");
    dispatch(setAllTasks({ tasks: dataset["tasks"] })); // Initialize the tasks object in redux initial state
    dispatch(setAllColumns({ columns: dataset["columns"] })); // Initialize the columns object in redux initial state
    dispatch(setColumnOrder({ columnOrder: dataset["columnOrder"] })); // Initialize the columns order in redux initial state
  }, [dispatch]);

  return (
    <>
      <div style={{ textAlign: "center", color: "white" }}>
        <h1>Tasks Mangement Board</h1>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: "flex" }}
            >
              {data.columnOrder.map((colId, index) => {
                // Replace this with the Column component later
                return <Column key={colId} colId={colId} index={index} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default Board;

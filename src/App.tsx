import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import "./App.css";
import AddColumn from "./components/AddColumn";
import { useColumnsStore } from "./context/columns";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import ColumnCard from "./components/Column";
import { useState } from "react";
import { ColumnProps } from "./types/column";
import { createPortal } from "react-dom";

function App() {
  const { columns, setColumns } = useColumnsStore();

  const columnsId = columns.map((column) => column.id);

  const [activeColumn, setActiveColumn] = useState<ColumnProps | null>(null);

  const handleOnDragStart = (event: DragStartEvent) => {
    // Catch active column to applay trans formations
    if (event.active.data.current?.type == "column") {
      setActiveColumn(event.active.data.current.column);

      return;
    }
  };

  const handleOnDragEnd = (event: DragEndEvent) => {
    // Reorder columns when drag over
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId == overColumnId) return;

    const activeColumnIndex = columns.findIndex(
      (col) => col.id == activeColumnId
    );

    const overColumnIdex = columns.findIndex((col) => col.id == overColumnId);

    setColumns(arrayMove(columns, activeColumnIndex, overColumnIdex));
  };

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 50, //px
    },
  });

  const sensors = useSensors(pointerSensor);

  return (
    <div className="flex items-center min-h-screen overflow-auto w-full px-10">
      <DndContext
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
        sensors={sensors}
      >
        <div className="flex gap-5">
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <ColumnCard column={column} key={column.id} />
            ))}
          </SortableContext>

          <AddColumn />
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnCard column={activeColumn} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default App;

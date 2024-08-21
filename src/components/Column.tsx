import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useColumnsStore } from "@/context/columns";
import ReusableModal from "./ReusableModal";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { ColumnProps } from "@/types/column";
import { CSS } from "@dnd-kit/utilities";

interface ColumnCardProps {
  column: ColumnProps;
}

const ColumnCard = ({ column }: ColumnCardProps) => {
  const { remove } = useColumnsStore();
  const [isOpen, setIsOpen] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Card
        className="w-96 animate-pulse bg-zinc-800/10"
        style={style}
        ref={setNodeRef}
      ></Card>
    );
  }

  return (
    <Card className="w-96" ref={setNodeRef} style={style}>
      <CardHeader {...attributes} {...listeners}>
        <CardTitle className="text-sm font-normal flex justify-between items-center">
          <p className="bg-zinc-800 rounded w-10 h-8 flex justify-center items-center">
            0
          </p>

          <p className="text-lg">{column.title}</p>

          <ReusableModal
            triggerVariant="outline"
            content={
              <div className="flex flex-col gap-5">
                <p>Column name: {column.title}</p>
                <Button
                  type="submit"
                  variant="destructive"
                  onClick={() => remove(column.id)}
                >
                  Confirm
                </Button>
              </div>
            }
            title="Delete Column"
            trigger={<Trash size={16} />}
            isOpen={isOpen}
            onOpen={setIsOpen}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>content</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
};

export default ColumnCard;

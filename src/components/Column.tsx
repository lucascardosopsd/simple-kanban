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
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface ColumnCardProps {
  column: ColumnProps;
}

const ColumnCard = ({ column }: ColumnCardProps) => {
  const { remove, update } = useColumnsStore();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({ defaultValues: { title: "" } });

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

  const handleUpdateTitle = (data: { title: string }) => {
    update({ ...column, title: data.title });
    toast.success("Column updated!");
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
        <CardTitle className="text-sm font-normal flex justify-between items-center p-0 gap-2">
          <p className="bg-background border border-border rounded w-12 h-10 flex justify-center items-center">
            0
          </p>
          <div className="group">
            <p className="block group-hover:hidden text-lg">{column.title}</p>

            <form
              onSubmit={form.handleSubmit(handleUpdateTitle)}
              className="hidden gap-2 group-hover:flex"
            >
              <Input
                {...form.register("title")}
                placeholder={column.title}
                className="border-none placeholder:text-lg text-lg placeholder:text-white"
              />

              <Button type="submit" className="hidden">
                OK
              </Button>
            </form>
          </div>

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

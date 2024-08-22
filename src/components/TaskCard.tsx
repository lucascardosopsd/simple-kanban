import { TaskProps } from "@/types/task";
import ReusableModal from "./ReusableModal";
import { Card, CardHeader } from "./ui/card";
import { useColumnsStore } from "@/context/columns";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useTasksStore } from "@/context/tasks";

interface TaskCardProps {
  task: TaskProps;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { get } = useColumnsStore();
  const { remove } = useTasksStore();

  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteTask = () => {
    remove(task.id);
    setIsOpen(false);
  };

  return (
    <ReusableModal
      triggerAsChild={false}
      title={
        <div className="flex gap-2">
          <p>{task.title}</p>
          <p className="text-muted">[{get(task.columnId).title}]</p>
        </div>
      }
      trigger={
        <Card className="hover:border-red-500 transition group">
          <CardHeader className="flex-row items-center gap-2 p-4 h-20">
            <p className="flex-1 truncate text-start">{task.title}</p>
          </CardHeader>
        </Card>
      }
      content={<p>{task.content}</p>}
      footer={
        <Button
          onClick={handleDeleteTask}
          variant="outline"
          className="ml-auto gap-2"
        >
          Deletar <TrashIcon size={16} />
        </Button>
      }
      isOpen={isOpen}
      onOpen={setIsOpen}
    />
  );
};

export default TaskCard;

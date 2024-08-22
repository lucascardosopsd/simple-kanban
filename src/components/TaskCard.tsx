import { TaskProps } from "@/types/task";
import ReusableModal from "./ReusableModal";
import { Card, CardHeader } from "./ui/card";
import { useColumnsStore } from "@/context/columns";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";

interface TaskCardProps {
  task: TaskProps;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { get } = useColumnsStore();

  const handleDeleteTask = () => {};

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
        <Card className="hover:border-red-500 transition">
          <CardHeader className="flex-row items-center gap-2 p-4">
            <p className="flex-1 truncate text-start">{task.title}</p>

            <Button
              onClick={handleDeleteTask}
              size="sm"
              variant="ghost"
              className="text-muted"
            >
              <TrashIcon size={16} />
            </Button>
          </CardHeader>
        </Card>
      }
      content={<p>{task.content}</p>}
    />
  );
};

export default TaskCard;

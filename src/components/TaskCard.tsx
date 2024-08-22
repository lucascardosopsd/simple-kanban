import { TaskProps } from "@/types/task";
import ReusableModal from "./ReusableModal";
import { Card, CardHeader } from "./ui/card";
import { useColumnsStore } from "@/context/columns";

interface TaskCardProps {
  task: TaskProps;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { get } = useColumnsStore();

  console.log(task);

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
          <CardHeader>{task.title}</CardHeader>
        </Card>
      }
      content={<p>{task.content}</p>}
    />
  );
};

export default TaskCard;

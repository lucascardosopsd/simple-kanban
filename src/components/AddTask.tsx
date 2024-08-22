import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";
import { useTasksStore } from "@/context/tasks";
import { ErrorMessage } from "@hookform/error-message";
import ReusableModal from "./ReusableModal";
import { useTaskForm } from "@/hooks/useAddTaskForm";
import { Input } from "./ui/input";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddTask = ({ columnId }: { columnId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { add } = useTasksStore();

  const form = useTaskForm();

  const handleAddTask = (data: { title: string; content: string }) => {
    add({ id: uuidv4(), columnId, ...data });
    form.reset();
    setIsOpen(false);
  };

  return (
    <ReusableModal
      content={
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit(handleAddTask)}
        >
          <p>Task title</p>
          <Input maxLength={100} type="text" {...form.register("title")} />
          <ErrorMessage errors={form.formState.errors} name="title" />

          <p>Task content</p>
          <Input maxLength={100} type="text" {...form.register("content")} />
          <ErrorMessage errors={form.formState.errors} name="content" />

          <Button type="submit">Confirm</Button>
        </form>
      }
      title="Add Task"
      trigger={
        <>
          <CirclePlus className="mr-2" size={16} /> Add Card
        </>
      }
      triggerClassName="w-full hover:border-red-500 hover:bg-background"
      triggerVariant="outline"
      isOpen={isOpen}
      onOpen={setIsOpen}
    />
  );
};

export default AddTask;

import { CirclePlus } from "lucide-react";
import { useColumnsStore } from "@/context/columns";
import ReusableModal from "./ReusableModal";
import { Input } from "./ui/input";
import { useAddColumnForm } from "@/hooks/useAddColumnForm";
import { v4 as uuidv4 } from "uuid";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from "./ui/button";
import { useState } from "react";

const AddColumn = () => {
  const { add } = useColumnsStore();
  const [isOpen, setIsOpen] = useState(false);

  const form = useAddColumnForm();

  const handleAddColumn = ({ title }: { title: string }) => {
    const id = uuidv4();

    add({ id, title: title });

    setIsOpen(false);
  };

  return (
    <>
      <ReusableModal
        triggerClassName="w-72 hover:border-red-500 hover:bg-zinc-900!"
        triggerVariant="outline"
        content={
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(handleAddColumn)}
          >
            <p>Column name</p>
            <Input maxLength={100} type="text" {...form.register("title")} />
            <ErrorMessage errors={form.formState.errors} name="title" />

            <Button type="submit">Confirm</Button>
          </form>
        }
        title="Add column"
        trigger={
          <>
            <CirclePlus className="mr-2" size={16} /> Add Column
          </>
        }
        isOpen={isOpen}
        onOpen={setIsOpen}
      />
    </>
  );
};

export default AddColumn;

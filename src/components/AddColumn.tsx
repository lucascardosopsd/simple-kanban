import { CirclePlus } from "lucide-react";
import { useColumnsStore } from "@/context/columns";
import ReusableModal from "./ReusableModal";
import { Input } from "./ui/input";
import { useAddColumnForm } from "@/hooks/useAddColumnForm";
import { v4 as uuidv4 } from "uuid";
import { ErrorMessage } from "@hookform/error-message";

const AddColumn = () => {
  const { add } = useColumnsStore();

  const form = useAddColumnForm();

  const handleAddColumn = ({ title }: { title: string }) => {
    const id = uuidv4();

    add({ id, title: title });
  };

  return (
    <>
      <ReusableModal
        content={
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(handleAddColumn)}
          >
            <p>Column name</p>
            <Input maxLength={100} type="text" {...form.register("title")} />
            <ErrorMessage errors={form.formState.errors} name="title" />
          </form>
        }
        title="Add column"
        trigger={
          <>
            Add Column <CirclePlus className="ml-2" />
          </>
        }
      />
    </>
  );
};

export default AddColumn;

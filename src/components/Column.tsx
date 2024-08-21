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

interface ColumnProps {
  title: string;
  id: string;
}

const Column = ({ title, id }: ColumnProps) => {
  const { remove } = useColumnsStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-sm font-normal flex justify-between items-center">
          <p className="bg-zinc-800 rounded w-10 h-8 flex justify-center items-center">
            0
          </p>

          <p className="text-lg">{title}</p>

          <ReusableModal
            triggerVariant="outline"
            content={
              <div className="flex flex-col gap-5">
                <p>Column name: {title}</p>
                <Button
                  type="submit"
                  variant="destructive"
                  onClick={() => remove(id)}
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

export default Column;

import { TrashIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface ColumnProps {
  title: string;
}

const Column = ({ title }: ColumnProps) => {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-sm font-normal flex justify-between items-center">
          <p className="bg-zinc-800 rounded w-10 h-8 flex justify-center items-center">
            0
          </p>
          <p className="text-lg">{title}</p>
          <Button size="sm" variant="outline">
            <TrashIcon size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>content</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
};

export default Column;

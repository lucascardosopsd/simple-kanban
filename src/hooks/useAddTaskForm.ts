import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useTaskForm = () => {
  return useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    resolver: zodResolver(taskValidator),
  });
};

export const taskValidator = z.object({
  title: z
    .string({ required_error: "Type title", invalid_type_error: "Text only" })
    .max(100, "Max 100 char"),
  content: z
    .string({ required_error: "Type content", invalid_type_error: "Text only" })
    .max(500, "Max 500 char")
    .optional(),
});

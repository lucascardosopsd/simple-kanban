import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useAddColumnForm = () => {
  return useForm({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(columnValidator),
  });
};

export const columnValidator = z.object({
  title: z
    .string({ required_error: "Type title", invalid_type_error: "Text only" })
    .max(100),
});

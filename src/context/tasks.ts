import { TaskProps } from "@/types/task";
import { create } from "zustand";

interface ColumnsStoreProps {
  tasks: TaskProps[] | [];
  setTasks: (columns: TaskProps[]) => void;
  add: (task: TaskProps) => void;
  remove: (id: string) => void;
  update: (data: TaskProps) => void;
}

export const useTasksStore = create<ColumnsStoreProps>((set, get) => ({
  tasks: [],
  setTasks: (tasks) => set(() => ({ tasks: tasks })),
  add: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  remove: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id != id),
    })),
  update: (data) => {
    const tasksUpdated = get().tasks.map((task) =>
      task.id !== data.id ? task : { ...task, ...data }
    );
    set({ tasks: tasksUpdated });
  },
}));

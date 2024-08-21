import { ColumnProps } from "@/types/column";
import { create } from "zustand";

interface ColumnsStoreProps {
  columns: ColumnProps[] | [];
  add: (column: ColumnProps) => void;
  remove: (id: string) => void;
}

export const useColumnsStore = create<ColumnsStoreProps>((set) => ({
  columns: [],
  add: (column) => set((state) => ({ columns: [...state.columns, column] })),
  remove: (id) =>
    set((state) => ({
      columns: state.columns.filter((column) => column.id != id),
    })),
}));

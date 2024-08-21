import { ColumnProps } from "@/types/column";
import { create } from "zustand";

interface ColumnsStoreProps {
  columns: ColumnProps[] | [];
  setColumns: (columns: ColumnProps[]) => void;
  add: (column: ColumnProps) => void;
  remove: (id: string) => void;
}

export const useColumnsStore = create<ColumnsStoreProps>((set) => ({
  columns: [],
  setColumns: (columns) => set(() => ({ columns: columns })),
  add: (column) => set((state) => ({ columns: [...state.columns, column] })),
  remove: (id) =>
    set((state) => ({
      columns: state.columns.filter((column) => column.id != id),
    })),
}));

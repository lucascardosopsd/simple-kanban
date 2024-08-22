import { ColumnProps } from "@/types/column";
import { create } from "zustand";

interface ColumnsStoreProps {
  columns: ColumnProps[] | [];
  setColumns: (columns: ColumnProps[]) => void;
  add: (column: ColumnProps) => void;
  remove: (id: string) => void;
  update: (data: ColumnProps) => void;
}

export const useColumnsStore = create<ColumnsStoreProps>((set, get) => ({
  columns: [],
  setColumns: (columns) => set(() => ({ columns: columns })),
  add: (column) => set((state) => ({ columns: [...state.columns, column] })),
  remove: (id) =>
    set((state) => ({
      columns: state.columns.filter((column) => column.id != id),
    })),
  update: (data) => {
    const columnsUpdated = get().columns.map((column) =>
      column.id !== data.id ? column : { ...column, ...data }
    );

    set({ columns: columnsUpdated });
  },
}));

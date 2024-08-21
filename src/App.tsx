import "./App.css";
import AddColumn from "./components/AddColumn";
import { useColumnsStore } from "./context/columns";

function App() {
  const { columns } = useColumnsStore();

  return (
    <div className="flex min-h-screen items-center overflow-auto w-full px-10">
      <AddColumn />

      {columns.map((column) => (
        <p key={column.id}>{column.title}</p>
      ))}
    </div>
  );
}

export default App;

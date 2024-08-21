import "./App.css";
import AddColumn from "./components/AddColumn";
import Column from "./components/Column";
import { useColumnsStore } from "./context/columns";

function App() {
  const { columns } = useColumnsStore();

  return (
    <div className="flex items-center min-h-screen overflow-auto w-full px-10">
      <div className="flex gap-5">
        {columns.map((column) => (
          <Column id={column.id} title={column.title} key={column.id} />
        ))}

        <AddColumn />
      </div>
    </div>
  );
}

export default App;

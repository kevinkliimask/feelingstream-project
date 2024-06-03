import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="ml-48">
      <BrowserRouter>
        <Sidebar />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;

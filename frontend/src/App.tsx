import AppRoutes from "@/routes";
import Sidebar from "@/components/sidebar";

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="ml-48">
      <BrowserRouter>
        <Sidebar />
        <div className="p-8">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

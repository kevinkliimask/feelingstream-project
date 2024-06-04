import { Route, Routes } from "react-router-dom";

import Customers from "@/views/customers";
import Interactions from "@/views/interactions";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index path="/customers" element={<Customers />} />
      <Route index path="/interactions" element={<Interactions />} />
    </Routes>
  );
};

export default AppRoutes;

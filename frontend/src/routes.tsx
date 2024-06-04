import { Navigate, Route, Routes } from "react-router-dom";

import Customers from "@/views/customers";
import Interactions from "@/views/interactions";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/customers" />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/interactions" element={<Interactions />} />
      <Route path="*" element={<Navigate to="/customers" />} />
    </Routes>
  );
};

export default AppRoutes;

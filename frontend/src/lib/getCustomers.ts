import axios from "axios";

import { Customer } from "@/interfaces/customer";

export const getCustomers = async () => {
  const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "customers");
  return response.data as { data: Customer[] };
};

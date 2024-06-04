import { Customer } from "@/interfaces/customer";
import axios from "axios";

export const getCustomers = async () => {
  const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "customers");
  return response.data as { data: Customer[] };
};

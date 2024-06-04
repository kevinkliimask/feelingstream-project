import { Customer } from "./customer";

export interface Interaction {
  uuid: string;
  title: string;
  description: string;
  created_at: string;
  customer?: Customer;
}

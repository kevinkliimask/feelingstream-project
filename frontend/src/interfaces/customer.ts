import { Interaction } from "./interaction";

export interface Customer {
  uuid: string;
  name: string;
  created_at: string;
  interactions?: Interaction[];
}
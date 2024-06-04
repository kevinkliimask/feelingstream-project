import { Interaction } from "./interaction";

export interface Customer {
  uuid: string;
  name: string;
  interatctions?: Interaction[];
}
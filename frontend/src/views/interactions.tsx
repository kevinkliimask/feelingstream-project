import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Interaction } from "@/interfaces/interaction";
import axios from "axios";
import { useQuery } from "react-query";

const getInteractions = async () => {
  const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "interactions");
  return response.data.data as [Interaction, string][];
};

const Interactions = () => {
  const { data: interactions, error } = useQuery("interactionsData", getInteractions);

  return (
    <Table>
      <TableCaption>
        {error ? "Error: Failed to fetch data." : "A list of all customer interactions."}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Created at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {interactions &&
          interactions.map((interaction) => (
            <TableRow key={interaction[0].id}>
              <TableCell className="font-medium">{interaction[0].title}</TableCell>
              <TableCell>{interaction[1]}</TableCell>
              <TableCell>{interaction[0].description}</TableCell>
              <TableCell className="text-right">{interaction[0].created_at}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default Interactions;

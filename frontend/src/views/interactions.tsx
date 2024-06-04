import { Interaction } from "@/interfaces/interaction";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "react-query";
import axios from "axios";

import CreateInteraction from "@/components/add-interaction";

const getInteractions = async () => {
  const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "interactions");
  return response.data as { data: Interaction[] };
};

const Interactions = () => {
  const { data: interactions, error, refetch } = useQuery("interactionsData", getInteractions);

  return (
    <>
      <div className="flex justify-between mb-8">
        <h1 className="text-xl font-bold">Interactions</h1>
        <CreateInteraction onSuccess={refetch} />
      </div>
      <Table>
        <TableCaption>{error ? "Error: Failed to fetch data." : "A list of all customer interactions."}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interactions &&
            interactions.data.map((interaction) => (
              <TableRow key={interaction.uuid}>
                <TableCell className="font-medium">{interaction.title}</TableCell>
                <TableCell>{interaction.customer?.name}</TableCell>
                <TableCell>{interaction.description}</TableCell>
                <TableCell className="text-right">{interaction.created_at}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Interactions;

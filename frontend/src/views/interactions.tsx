import { MoreHorizontal } from "lucide-react";
import { useQuery } from "react-query";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Interaction } from "@/interfaces/interaction";
import CreateInteraction from "@/components/add-interaction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DeleteInteraction from "@/components/delete-interaction";
import EditInteraction from "@/components/edit-interaction";

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
            <TableHead className="w-[1px]" />
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
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <EditInteraction
                          uuid={interaction.uuid}
                          defaultValues={{ title: interaction.title, description: interaction.description }}
                          onSuccess={refetch}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <DeleteInteraction
                          uuid={interaction.uuid}
                          title={interaction.title}
                          customerName={interaction.customer!.name}
                          onSuccess={refetch}
                        />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Interactions;

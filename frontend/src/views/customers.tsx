import CreateCustomer from "@/components/create-customer";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCustomers } from "@/lib/getCustomers";
import { useQuery } from "react-query";

const Customers = () => {
  const { data: customers, error, refetch } = useQuery("customersData", getCustomers);

  return (
    <>
      <div className="flex justify-between mb-8">
        <h1 className="text-xl font-bold">Customers</h1>
        <CreateCustomer onSuccess={refetch} />
      </div>
      <Table>
        <TableCaption>{error ? "Error: Failed to fetch data." : "A list of all customers."}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>UUID</TableHead>
            <TableHead>Total Interactions</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers &&
            customers.data.map((customer) => (
              <TableRow key={customer.uuid}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.uuid}</TableCell>
                <TableCell>{customer.interactions?.length}</TableCell>
                <TableCell className="text-right">{customer.created_at}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Customers;
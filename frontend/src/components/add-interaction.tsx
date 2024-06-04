import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCustomers } from "@/lib/getCustomers";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "react-query";
import Combobox from "@/components/combobox";

const AddInteraction = () => {
  const { data: customers, error } = useQuery("customersData", getCustomers);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold">Add Interaction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Interaction</DialogTitle>
          <DialogDescription>
            Select a customer and enter details of the interaction. Click "Add" when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div>
            <Label htmlFor="customer">Customer</Label>
            <div className="mt-1">
              <Combobox
                options={customers?.data.map((customer) => ({
                  label: customer.name,
                  value: `${customer.uuid} ${customer.name}`,
                }))}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="title">Interaction title</Label>
            <Input id="title" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="description">Interaction description</Label>
            <Textarea id="description" className="mt-1" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddInteraction;

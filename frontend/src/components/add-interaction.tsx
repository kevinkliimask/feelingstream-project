import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";

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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getCustomers } from "@/lib/getCustomers";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Combobox from "@/components/combobox";

const FormSchema = z.object({
  customer_uuid_name: z.string().min(1, { message: "Please select a customer" }),
  title: z.string().min(1, { message: "Please enter a title" }),
  description: z.string().min(1, { message: "Please enter a description" }),
});

interface AddInteractionProps {
  onSuccess: () => void;
}

const AddInteraction = ({ onSuccess }: AddInteractionProps ) => {
  const [open, setOpen] = useState(false);
  const { data: customers } = useQuery("customersData", getCustomers);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      customer_uuid_name: "",
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { customer_uuid_name, ...rest } = values;
    await axios.post(import.meta.env.VITE_BACKEND_URL + "interactions", {
      ...rest,
      customer_uuid: customer_uuid_name.split(" ")[0],
    });
    setOpen(false);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold">
          Add Interaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Interaction</DialogTitle>
          <DialogDescription>
            Select a customer and enter details of the interaction. Click "Add" when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 py-4">
              <FormField
                control={form.control}
                name="customer_uuid_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <FormControl>
                      <Combobox
                        options={customers?.data.map((customer) => ({
                          label: customer.name,
                          value: `${customer.uuid} ${customer.name}`,
                        }))}
                        fieldValue={field.value}
                        setFieldValue={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interaction title</FormLabel>
                    <FormControl>
                      <Input className="mt-1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interaction description</FormLabel>
                    <FormControl>
                      <Textarea className="mt-1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInteraction;

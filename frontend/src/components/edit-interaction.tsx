import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  title: z.string().min(1, { message: "Please enter a title" }),
  description: z.string().min(1, { message: "Please enter a description" }),
});

interface EditInteractionProps {
  uuid: string;
  defaultValues: { title: string; description: string };
  onSuccess: () => void;
}

const EditInteraction = ({ uuid, defaultValues, onSuccess }: EditInteractionProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    await axios.put(import.meta.env.VITE_BACKEND_URL + `interactions/${uuid}`, {
      ...values,
    });
    setOpen(false);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Edit interaction</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Interaction</DialogTitle>
          <DialogDescription>Edit the details of the interaction. Click "Save" when you're done.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 py-4">
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
                      <Textarea defaultValue={defaultValues.description} className="mt-1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInteraction;

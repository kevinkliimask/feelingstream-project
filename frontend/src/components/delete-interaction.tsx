import { useState } from "react";
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

interface EditInteractionProps {
  uuid: string;
  title: string;
  customerName: string;
  onSuccess: () => void;
}

const DeleteInteraction = ({ uuid, title, customerName, onSuccess }: EditInteractionProps) => {
  const [open, setOpen] = useState(false);

  const onSubmit = async () => {
    await axios.delete(import.meta.env.VITE_BACKEND_URL + `interactions/${uuid}`);
    setOpen(false);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-destructive">Delete interaction</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Interaction</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the interaction titled{" "}
            <span className="font-bold text-foreground">{title}</span> for customer named{" "}
            <span className="font-bold text-foreground">{customerName}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={onSubmit}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteInteraction;

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

interface SettingsModalProps {
  toppings: string[];
  onUpdateToppings: (newToppings: string[]) => void;
  triggerButton: React.ReactNode;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ toppings, onUpdateToppings, triggerButton }) => {
  const [open, setOpen] = useState(false);
  const [currentToppings, setCurrentToppings] = useState<string[]>(toppings);
  const [newTopping, setNewTopping] = useState("");

  // Reset currentToppings when the modal opens
  useEffect(() => {
    if (open) {
      setCurrentToppings([...toppings]);
    }
  }, [open, toppings]);

  const handleAddTopping = () => {
    if (newTopping && !currentToppings.includes(newTopping)) {
      setCurrentToppings([...currentToppings, newTopping]);
      setNewTopping("");
    }
  };

  const handleRemoveTopping = (topping: string) => {
    setCurrentToppings(currentToppings.filter((t) => t !== topping));
  };

  const handleSave = () => {
    onUpdateToppings(currentToppings);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-primary">Pizza Toppings Settings</DialogTitle>
          <DialogDescription className="text-muted-foreground">Customize the list of available pizza toppings.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input
            value={newTopping}
            onChange={(e) => setNewTopping(e.target.value)}
            placeholder="Add new topping"
            className="bg-background text-foreground"
          />
          <Button onClick={handleAddTopping} className="bg-secondary text-secondary-foreground">
            Add
          </Button>
        </div>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          {currentToppings.map((topping) => (
            <div key={topping} className="flex items-center justify-between py-2">
              <span className="text-foreground">{topping}</span>
              <Button variant="ghost" size="sm" onClick={() => handleRemoveTopping(topping)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </ScrollArea>
        <div className="flex justify-end space-x-2">
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary text-primary-foreground">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

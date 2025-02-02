import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllToppings, type UserPreference } from "../utils/pizzaUtils";

interface UserPreferenceFormProps {
  onSubmit: (preference: UserPreference) => void;
  initialPreference?: UserPreference;
}

type ToppingPreference = "like" | "dislike" | "neutral";

export const UserPreferenceForm: React.FC<UserPreferenceFormProps> = ({ onSubmit, initialPreference }) => {
  const allToppings = getAllToppings();
  const [preferences, setPreferences] = useState<Record<string, ToppingPreference>>({});
  const [name, setName] = useState("");

  useEffect(() => {
    if (initialPreference) {
      const initPrefs: Record<string, ToppingPreference> = {};
      allToppings.forEach((topping) => {
        if (initialPreference.likes.includes(topping)) {
          initPrefs[topping] = "like";
        } else if (initialPreference.dislikes.includes(topping)) {
          initPrefs[topping] = "dislike";
        } else {
          initPrefs[topping] = "neutral";
        }
      });
      setPreferences(initPrefs);
      setName(initialPreference.name || "");
    } else {
      setPreferences(Object.fromEntries(allToppings.map((topping) => [topping, "neutral"])));
      setName("");
    }
  }, [initialPreference, allToppings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const likes = Object.entries(preferences)
      .filter(([_, pref]) => pref === "like")
      .map(([topping, _]) => topping);
    const dislikes = Object.entries(preferences)
      .filter(([_, pref]) => pref === "dislike")
      .map(([topping, _]) => topping);

    onSubmit({
      id: initialPreference ? initialPreference.id : Date.now(),
      name,
      likes,
      dislikes,
    });
  };

  const handlePreferenceChange = (topping: string, preference: ToppingPreference) => {
    setPreferences((prev) => ({ ...prev, [topping]: preference }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
      </div>
      <ScrollArea className="h-[300px] w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Topping</TableHead>
              <TableHead className="text-center">Preference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allToppings.map((topping) => (
              <TableRow key={topping}>
                <TableCell className="font-medium">{topping}</TableCell>
                <TableCell>
                  <RadioGroup
                    onValueChange={(value) => handlePreferenceChange(topping, value as ToppingPreference)}
                    value={preferences[topping]}
                    className="flex justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="like" id={`like-${topping}`} />
                      <Label htmlFor={`like-${topping}`} className="text-green-600">
                        Like
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="neutral" id={`neutral-${topping}`} />
                      <Label htmlFor={`neutral-${topping}`}>Neutral</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dislike" id={`dislike-${topping}`} />
                      <Label htmlFor={`dislike-${topping}`} className="text-red-600">
                        Dislike
                      </Label>
                    </div>
                  </RadioGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <Button type="submit" className="w-full">
        {initialPreference ? "Update" : "Add"} User Preference
      </Button>
    </form>
  );
};

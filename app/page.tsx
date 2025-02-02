"use client";

import { useState } from "react";
import { PreferenceModal } from "../components/PreferenceModal";
import { SettingsModal } from "../components/SettingsModal";
import { PizzaOrderDisplay } from "../components/PizzaOrderDisplay";
import { type UserPreference, generatePizzaOrder, type PizzaOrder, getAllToppings, updateToppings } from "../utils/pizzaUtils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Settings } from "lucide-react";

export default function PizzaOrderApp() {
  const [userPreferences, setUserPreferences] = useState<UserPreference[]>([]);
  const [pizzaOrder, setPizzaOrder] = useState<PizzaOrder[]>([]);
  const [toppings, setToppings] = useState(getAllToppings());

  const handleAddUserPreference = (preference: UserPreference) => {
    setUserPreferences((prev) => [...prev, preference]);
  };

  const handleEditUserPreference = (editedPreference: UserPreference) => {
    setUserPreferences((prev) => prev.map((pref) => (pref.id === editedPreference.id ? editedPreference : pref)));
  };

  const handleDeleteUserPreference = (id: number) => {
    setUserPreferences((prev) => prev.filter((pref) => pref.id !== id));
  };

  const handleGenerateOrder = () => {
    const order = generatePizzaOrder(userPreferences);
    setPizzaOrder(order);
  };

  const handleUpdateToppings = (newToppings: string[]) => {
    setToppings(newToppings);
    updateToppings(newToppings);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Pizza Order App</h1>
          <SettingsModal
            toppings={toppings}
            onUpdateToppings={handleUpdateToppings}
            triggerButton={
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            }
          />
        </div>
        <PreferenceModal
          onSubmit={handleAddUserPreference}
          triggerButton={<Button className="bg-secondary text-secondary-foreground">Add User Preference</Button>}
        />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-secondary">User Preferences</h2>
          <ul className="space-y-4">
            {userPreferences.map((pref, index) => (
              <li key={pref.id} className="bg-card text-card-foreground p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <strong className="text-primary">{pref.name || `User ${index + 1}`}</strong>
                  <div className="space-x-2">
                    <PreferenceModal
                      onSubmit={handleEditUserPreference}
                      initialPreference={pref}
                      triggerButton={
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      }
                    />
                    <Button variant="outline" size="icon" onClick={() => handleDeleteUserPreference(pref.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-accent">Likes:</span> {pref.likes.join(", ") || "None"}
                </div>
                <div>
                  <span className="font-semibold text-accent">Dislikes:</span> {pref.dislikes.join(", ") || "None"}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {userPreferences.length > 0 && (
          <Button onClick={handleGenerateOrder} className="mt-4 bg-secondary text-secondary-foreground">
            Generate Pizza Order
          </Button>
        )}
        {pizzaOrder.length > 0 && <PizzaOrderDisplay orders={pizzaOrder} />}
      </div>
    </div>
  );
}

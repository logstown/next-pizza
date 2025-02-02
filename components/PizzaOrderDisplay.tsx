import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PizzaOrder } from "../utils/pizzaUtils";

interface PizzaOrderDisplayProps {
  orders: PizzaOrder[];
}

export const PizzaOrderDisplay: React.FC<PizzaOrderDisplayProps> = ({ orders }) => {
  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-secondary">Pizza Order</h2>
      {orders.map((order, index) => (
        <Card key={index} className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-primary">Pizza {index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong className="text-accent">Size:</strong> {order.size}
            </p>
            <p>
              <strong className="text-accent">Toppings:</strong> {order.toppings.join(", ") || "Plain cheese"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

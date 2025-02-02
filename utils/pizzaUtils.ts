export interface UserPreference {
  id: number;
  name?: string;
  likes: string[];
  dislikes: string[];
}

export interface PizzaOrder {
  size: string;
  toppings: string[];
}

let TOPPINGS = [
  "Pepperoni",
  "Mushrooms",
  "Onions",
  "Sausage",
  "Bacon",
  "Extra cheese",
  "Black olives",
  "Green peppers",
  "Pineapple",
  "Spinach",
];

export const getAllToppings = () => TOPPINGS;

export const updateToppings = (newToppings: string[]) => {
  TOPPINGS = newToppings;
};

export const generatePizzaOrder = (preferences: UserPreference[]): PizzaOrder[] => {
  const userCount = preferences.length;
  const likedToppings = new Set<string>();
  const dislikedToppings = new Set<string>();

  preferences.forEach((pref) => {
    pref.likes.forEach((topping) => likedToppings.add(topping));
    pref.dislikes.forEach((topping) => dislikedToppings.add(topping));
  });

  const finalToppings = Array.from(likedToppings).filter((topping) => !dislikedToppings.has(topping));

  const pizzaCount = Math.ceil(userCount / 4);
  const pizzas: PizzaOrder[] = [];

  for (let i = 0; i < pizzaCount; i++) {
    pizzas.push({
      size: userCount <= 2 ? "Medium" : "Large",
      toppings: finalToppings,
    });
  }

  return pizzas;
};

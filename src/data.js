// Palmwine & Pepper is a fictional restaurant, made up for this portfolio demo.

export const info = {
  name: "Palmwine & Pepper",
  tagline: "Modern Nigerian grill",
  address: "14 Admiralty Way, Lekki Phase 1, Lagos",
  phone: "+234 800 000 0000",
  hours: [
    ["Tuesday – Thursday", "12:00 – 22:00"],
    ["Friday – Saturday", "12:00 – 23:30"],
    ["Sunday", "13:00 – 21:00"],
    ["Monday", "Closed"],
  ],
};

export const menu = {
  Starters: [
    { name: "Peppered snail", desc: "Giant snails, scotch bonnet, onion, a squeeze of lime.", price: 6500, spicy: true },
    { name: "Plantain three ways", desc: "Dodo, crisp chips and spiced plantain mash.", price: 3500 },
    { name: "Asun", desc: "Smoky chopped goat, peppers and red onion.", price: 5500, spicy: true },
    { name: "Moi moi", desc: "Steamed bean pudding with egg and flaked fish.", price: 3000 },
  ],
  Mains: [
    { name: "Party jollof & chicken", desc: "Firewood-style jollof, charred chicken, coleslaw.", price: 9500, popular: true },
    { name: "Egusi & pounded yam", desc: "Melon seed soup with spinach, beef and stockfish.", price: 10500 },
    { name: "Ofada rice & ayamase", desc: "Local rice with green pepper stew and assorted meat.", price: 9000, spicy: true },
    { name: "Banga & starch", desc: "Palm-nut soup with catfish, Delta style.", price: 11000 },
  ],
  "From the grill": [
    { name: "Suya platter", desc: "Beef and chicken suya, yaji spice, tomato, onion.", price: 12000, popular: true, spicy: true },
    { name: "Grilled croaker", desc: "Whole fish, pepper sauce, plantain and yam fries.", price: 16500 },
    { name: "Ram chops", desc: "Grilled with ginger and uda, served with jollof.", price: 15000 },
  ],
  Drinks: [
    { name: "Chilled palm wine", desc: "Fresh from Ogun State, by the glass.", price: 2000 },
    { name: "Zobo", desc: "Hibiscus, ginger, pineapple. House-made.", price: 1500 },
    { name: "Chapman", desc: "The classic Lagos mocktail.", price: 2500 },
    { name: "Tigernut milk (kunu aya)", desc: "Creamy, lightly sweet, no dairy.", price: 2000 },
  ],
};

// Gallery tiles are drawn in SVG (see Dish.jsx), so no stock photos are needed.
export const gallery = [
  { title: "Party jollof", colors: ["#d9542b", "#f2a541", "#3f7d4e"] },
  { title: "Suya platter", colors: ["#8a3b1e", "#e07a3f", "#f4d58d"] },
  { title: "Egusi soup", colors: ["#e3b448", "#3f7d4e", "#f8f1e4"] },
  { title: "Grilled croaker", colors: ["#b56a3a", "#f2a541", "#d9542b"] },
  { title: "Zobo", colors: ["#7a1f3d", "#b83a5e", "#f8f1e4"] },
  { title: "Dodo", colors: ["#f2a541", "#e3b448", "#8a3b1e"] },
];

export const naira = (n) => "₦" + n.toLocaleString("en-NG");

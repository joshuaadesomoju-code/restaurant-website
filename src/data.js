// Palmwine & Pepper is a fictional restaurant, made up for this portfolio demo.

export const info = {
  name: "Palmwine & Pepper",
  tagline: "Modern Nigerian grill",
  address: "14 Admiralty Way, Lekki Phase 1, Lagos",
  phone: "+234 800 000 0000",
  hours: [
    ["Tuesday - Thursday", "12:00 - 22:00"],
    ["Friday - Saturday", "12:00 - 23:30"],
    ["Sunday", "13:00 - 21:00"],
    ["Monday", "Closed"],
  ],
};

// Opening hours per weekday (0 = Sunday), in decimal hours. Monday is closed.
export const OPEN = { 0: [13, 21], 1: null, 2: [12, 22], 3: [12, 22], 4: [12, 22], 5: [12, 23.5], 6: [12, 23.5] };

// Free-licence photography from Unsplash (https://unsplash.com/license).
// Replace with the restaurant's own photos when they exist.
export function photo(id, w, h) {
  const base = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=72`;
  return {
    src: `${base}&w=${w}&h=${h}`,
    srcSet: `${base}&w=${Math.round(w / 2)}&h=${Math.round(h / 2)} ${Math.round(w / 2)}w, ${base}&w=${w}&h=${h} ${w}w, ${base}&w=${w * 2}&h=${h * 2} ${w * 2}w`,
  };
}

export const photos = {
  hero: { id: "1664992960082-0ea299a9c53e", alt: "Jollof rice topped with grilled chicken and pepper skewers in a white dish", by: "Keesha's Kitchen" },
  jollof: { id: "1665332195309-9d75071138f0", alt: "Jollof rice with grilled fish, skewers, lime and scotch bonnet peppers", by: "Keesha's Kitchen" },
  grill: { id: "1708388464743-80126e9cdecf", alt: "Skewers cooking over open flames on a grill", by: "Daniel" },
  egusi: { id: "1763048443535-1243379234e2", alt: "Hands holding a bowl of egusi soup with assorted meats", by: "Tosan Dudun" },
  croaker: { id: "1718942899999-b3da4177ee2a", alt: "Whole grilled fish on a banana leaf", by: "Michael Lock" },
  fish: { id: "1725393325387-07f0d4951528", alt: "Two grilled fish with onions and peppers", by: "Francisca Dzise" },
  zobo: { id: "1654922704274-cd34f165c5e7", alt: "A glass of deep red hibiscus drink", by: "Eiliv Aceron" },
  dodo: { id: "1705088295605-dd465ae2fca2", alt: "Bowls of fried plantain and sides on a marble table", by: "Gourmet Lenz" },
  terrace: { id: "1514053026555-49ce8886ae41", alt: "Concrete terrace with wicker chairs, white tables and tropical plants", by: "Sonnie Hiles" },
  night: { id: "1759744869584-4707bf349525", alt: "Outdoor dining area under a timber pergola at night", by: "Maksim Shutov" },
  blocks: { id: "1573510675363-a8dd93d6ab5d", alt: "White breeze-block wall", by: "Zachary Keimig" },
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

// The photo shown beside each menu section.
export const menuPhoto = { Starters: "fish", Mains: "jollof", "From the grill": "grill", Drinks: "zobo" };

// Signature plates. Titles are unchanged from the original gallery.
export const gallery = [
  { title: "Party jollof", photo: "jollof" },
  { title: "Suya platter", photo: "grill" },
  { title: "Egusi soup", photo: "egusi" },
  { title: "Grilled croaker", photo: "croaker" },
  { title: "Zobo", photo: "zobo" },
  { title: "Dodo", photo: "dodo" },
];

export const naira = (n) => "₦" + n.toLocaleString("en-NG");

// Today's opening status, for the info band under the hero.
export function openStatus(now = new Date()) {
  const fmt = (t) => `${String(Math.floor(t)).padStart(2, "0")}:${t % 1 ? "30" : "00"}`;
  const h = OPEN[now.getDay()];
  const t = now.getHours() + now.getMinutes() / 60;
  if (h && t >= h[0] && t < h[1]) return { open: true, text: `Open now until ${fmt(h[1])}` };
  if (h && t < h[0]) return { open: false, text: `Opens today at ${fmt(h[0])}` };
  for (let i = 1; i <= 7; i++) {
    const d = (now.getDay() + i) % 7;
    if (OPEN[d]) {
      const day = i === 1 ? "tomorrow" : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d];
      return { open: false, text: `Closed now. Opens ${day} at ${fmt(OPEN[d][0])}` };
    }
  }
  return { open: false, text: "Closed" };
}

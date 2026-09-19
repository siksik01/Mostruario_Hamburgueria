import baconSupreme from "@/assets/bacon-supreme.jpg";
import bbqBurger from "@/assets/bbq-burger.jpg";
import classicBurger from "@/assets/classic-burger.jpg";
import doubleCheese from "@/assets/double-cheese.jpg";

export const restaurant = {
  name: "Sua Hamburgueria",
  address: ["Avenida das Brasas, 245", "Centro", "Santa Brasa - SC"],
  phone: "(47) 90000-0000",
  instagram: "@sua.hamburgueria",
  hours: [
    { days: "Segunda a Quinta", time: "18:00 — 23:00" },
    { days: "Sexta e Sábado", time: "18:00 — 00:00" },
    { days: "Domingo", time: "18:00 — 22:00" },
  ],
} as const;

export const products = [
  {
    id: "classic",
    name: "Classic Burger",
    description: "Pão brioche, carne artesanal, queijo cheddar, alface, tomate e molho especial.",
    price: 29.9,
    image: classicBurger,
  },
  {
    id: "bacon",
    name: "Bacon Supreme",
    description: "Carne artesanal, cheddar cremoso, bacon crocante, cebola caramelizada e molho da casa.",
    price: 34.9,
    image: baconSupreme,
  },
  {
    id: "bbq",
    name: "BBQ Burger",
    description: "Blend artesanal, queijo, bacon, cebola crispy e molho barbecue.",
    price: 32.9,
    image: bbqBurger,
  },
  {
    id: "double",
    name: "Double Cheese",
    description: "Duas carnes artesanais, queijo cheddar duplo, molho especial e picles.",
    price: 38.9,
    image: doubleCheese,
  },
] as const;

export type Product = (typeof products)[number];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
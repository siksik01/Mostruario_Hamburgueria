import { createFileRoute } from "@tanstack/react-router";
import { RestaurantSite } from "@/components/restaurant-site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sua Hamburgueria — Burgers artesanais em Santa Brasa" },
      { name: "description", content: "Hambúrgueres artesanais feitos na hora, ingredientes selecionados e muito sabor em Santa Brasa." },
      { property: "og:title", content: "Sua Hamburgueria — Burgers artesanais" },
      { property: "og:description", content: "Conheça os burgers favoritos da casa e monte seu pedido demonstrativo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RestaurantSite,
});

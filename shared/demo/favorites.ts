import type {TGmCard} from "@/components/globals/GmCard.vue"
export const gms: TGmCard[] = [
  {
    link: "/devs/rockstar-games",
    name: "Rockstar Games",
    avatar: null,
    rating: {
      value: 4.9,
      count: 12500
    },
    gamesCount: 42,
    averagePrice: "$39.99"
  },
  {
    link: "/devs/stardew-valley",
    name: "ConcernedApe",
    gamesCount: 1,
    averagePrice: "$14.99"
  },
  {
    link: "/devs/cd-projekt-red",
    name: "CD Projekt Red",
    rating: {
      value: 4.7,
      count: 8900
    },
    gamesCount: 8,
    averagePrice: "$49.99"
  },
  {
    link: "/devs/mojang",
    name: "Mojang Studios",
    avatar: null,
    gamesCount: 3,
    averagePrice: "$26.95"
  },
  {
    link: "/devs/naughty-dog",
    name: "Naughty Dog",
    avatar: null,
    rating: {
      value: 4.8,
      count: 15000
    },
    gamesCount: 12,
    averagePrice: "$59.99"
  }
]
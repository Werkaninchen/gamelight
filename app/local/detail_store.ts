import { create } from "zustand";

type Details = {
  bannerURL: string;
  description: string;
  id: number;
  rating: number;
  title: string;
  iconURL: string;
};

type DetailStore = {
  details: Details;
  state: "error" | "loading" | "loaded";
  error?: string;
  setDetails: (games: Details) => void;
  resetDetails: () => void;
  fetchDetails: (gameId: number) => Promise<void>;
};

const apiKey = "01964fa8-f0e5-40fc-a13b-9f5c3a5415f3";

export const useDetailStore = create<DetailStore>((set) => ({
  resetDetails: () => set({ details: {} as Details, state: "loading" }),
  details: {} as Details,
  state: "loading",
  setDetails: (details) => set({ details: details, state: "loaded" }),

  fetchDetails: async (gameId) => {
    try {
      console.log("X-API-Key", apiKey);

      const response = await fetch(
        "https://mock-game-api-9a408f047f23.herokuapp.com/api/games/" + gameId,
        {
          method: "GET",
          headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }

      set({ details: data, state: "loaded" });
    } catch (error) {
      set({ error: error as string, state: "error" });
    }
  },
}));

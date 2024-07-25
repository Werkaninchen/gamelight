import { create } from "zustand";

type Game = {
  id: number;
  title: string;
  rating: number;
  iconURL: string;
  liked: boolean;
};

type GameStore = {
  games: Game[];
  state: "error" | "loading" | "loaded";
  error?: string;
  setGames: (games: Game[]) => void;
  fetchGames: () => Promise<void>;
  likeGame: (gameId: number) => void;
};

const apiKey = "01964fa8-f0e5-40fc-a13b-9f5c3a5415f3";

export const useGameStore = create<GameStore>((set) => ({
  games: [],
  state: "loading",
  setGames: (games) => set({ games, state: "loaded" }),
  likeGame: async (gameId) => {
    try {
      set((state) => ({
        games: state.games.map((game) =>
          game.id === gameId ? { ...game, liked: !game.liked } : game
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  fetchGames: async () => {
    try {
      console.log("X-API-Key", apiKey);
      const response = await fetch(
        "https://mock-game-api-9a408f047f23.herokuapp.com/api/games",
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

      set({ games: data, state: "loaded" });
      console.log((data as Game[]).map((game) => game.iconURL));
    } catch (error) {
      set({ error: error as string, state: "error" });
    }
  },
}));

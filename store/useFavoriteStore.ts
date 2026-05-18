import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface FavoriteState {
  items: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleFavorite: (item) => {
        const isFav = get().items.some((i) => i.id === item.id);
        if (isFav) {
          set({ items: get().items.filter((i) => i.id !== item.id) });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      isFavorite: (id) => get().items.some((i) => i.id === id),
      clearFavorites: () => set({ items: [] }),
    }),
    {
      name: 'favorite-storage',
    }
  )
);

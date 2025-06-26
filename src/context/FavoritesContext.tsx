import React, { useState, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const FavoritesContext = React.createContext({
  favorites: new Array<string>(),
  addFavorite: (_id: string) => null,
  removeFavorite: (_id: string) => null,
  isFavorite: (_id: string): boolean => false
});

function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(new Array<string>());

  useLocalStorage('recipe-favorites', favorites, setFavorites);
  // our useLocalStorage is called with an empty array, so we have made it not save
  // this spurious data. So, we have made the toggleFavorite function add a
  // 'null' entry when all favorites have been removed, so that it is saved
  // properly in this case.
  function addFavorite(id: string) {
    if (favorites && !favorites.includes(id)) setFavorites([...favorites, id]);
    else setFavorites([id]);
    return null;
  }

  function removeFavorite(id: string) {
    if (favorites && favorites.includes(id)) {
      if (favorites.length === 1) setFavorites(['null']);
      else setFavorites(favorites.filter(fav => fav !== id));
    }
    return null;
  }

  function isFavorite(id: string): boolean {
    return favorites && favorites.includes(id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;

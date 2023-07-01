//context for keeping track of user favorites
import { createContext, useState } from "react";

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {

  const [favorites, setFavorites] = useState(null);

  return (
    <FavoritesContext.Provider value={ {favorites, setFavorites} }>
      {children}
    </FavoritesContext.Provider>
  );
};

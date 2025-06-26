import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Favorite } from '../components/Favorite/Favorite';

export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext);

  if (!favorites || favorites.filter(id => id !== 'null').length === 0)
    return (
      <h1 className="my-10 mx-auto items-center text-center">
        Please search or browse the recipes to pick some favorites!
      </h1>
    );
  return (
    <div className="w-full">
      {favorites &&
        favorites.map(id => {
          if (id === 'null') return;
          return <Favorite id={id} />;
        })}
    </div>
  );
}

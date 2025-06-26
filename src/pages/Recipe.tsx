import { useContext, useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartFilledIcon } from '@heroicons/react/24/solid';
import { FavoritesContext } from '../context/FavoritesContext';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';

export function Recipe() {
  const { idMeal } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const [ingredients, setIngredients] = useState<string[]>();
  const [measures, setMeasures] = useState<string[]>();
  const { favorites, addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);
  const [favorite, setFavorite] = useState(false);

  const { error, data, loading } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  useEffect(() => console.log('Loading:', loading), [loading]);
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  useEffect(() => {
    if (data && data.meals && data.meals.length) {
      const newRecipe = data.meals[0];
      setRecipe(newRecipe);
      const newIngredients = [];
      const newMeasure = [];
      for (let i = 1; i <= 20; i++) {
        newIngredients.push(newRecipe[`strIngredient${i}`]);
        newMeasure.push(newRecipe[`strMeasure${i}`]);
      }
      setIngredients(newIngredients);
      setMeasures(newMeasure);
    }
  }, [data]);

  useEffect(
    () =>
      setFavorite(
        favorites && favorites.length > 0 && favorites.includes(idMeal || '')
      ),
    [favorites]
  );

  if (loading) return <LoadingSpinner text="Loading recipe..." />;
  if (!recipe) return <ErrorMessage text="No recipe found." />;

  return (
    <div className="flex flex-col gap-5 ">
      <ErrorMessage text={error?.message || ''} />
      {recipe && (
        <>
          <div className="flex gap-5">
            <img
              alt={recipe.strMeal}
              src={recipe.strMealThumb}
              className="w-64 h-64"
            />
            <section className="flex flex-col gap-5 items-start">
              <h2 className="flex text-2xl font-bold items-center">
                {recipe.strMeal}{' '}
                <button
                  title={
                    isFavorite(recipe.idMeal)
                      ? 'Remove this favorite'
                      : 'Add favorite'
                  }
                  onClick={() => {
                    isFavorite(recipe.idMeal)
                      ? removeFavorite(recipe.idMeal)
                      : addFavorite(recipe.idMeal);
                    setFavorite(!favorite);
                  }}
                  className="text-blue-500 hover:text-blue-700 hover:bg-blue-200 ml-1 p-1 rounded-md w-fit"
                >
                  {favorite ? (
                    <HeartFilledIcon className="size-6 text-red-600" />
                  ) : (
                    <HeartIcon className="size-6 text-blue-600" />
                  )}
                </button>
              </h2>
              <div className="flex gap-5">
                <h3>
                  Category: <strong>{recipe.strCategory}</strong>
                </h3>
                <h3>
                  Cuisine: <strong>{recipe.strArea}</strong>
                </h3>
              </div>
              <ol className="list-bullet text-sm">
                {' '}
                {ingredients &&
                  ingredients.map((ing, i) => {
                    if (ing)
                      return (
                        <li key={i}>
                          {measures && measures[i]} <strong>{ing}</strong>
                        </li>
                      );
                  })}
              </ol>{' '}
            </section>
          </div>
          <ol className="list-decimal text-xs mx-5">
            {
              // break the instructions into paragraphs, so that they can be displayed
              // as a numbered list for easier use in the kitchen.
              recipe.strInstructions
                .split('\n')
                .filter(para => para.length > 2)
                .map((para, i) => {
                  return (
                    <li key={i} className="pb-2">
                      {para}
                    </li>
                  );
                })
            }
          </ol>
        </>
      )}
    </div>
  );
}

export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
};

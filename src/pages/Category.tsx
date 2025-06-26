import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { Link, useParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';

export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export function Category() {
  const { strCategory } = useParams();
  const [meals, setMeals] = useState<Meal[]>();

  const { error, data, loading } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`
  );
  useEffect(() => console.log('Loading:', loading), [loading]);
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);
  useEffect(() => {
    if (data && data.meals && data.meals.length) setMeals(data.meals);
  }, [data]);

  if (loading) return <LoadingSpinner text="Loading recipes..." />;
  if (!meals || meals.length === 0)
    return (
      <ErrorMessage text="No recipes found for that category, please try again." />
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <ErrorMessage text={error?.message || ''} />
      {meals &&
        meals.map(meal => {
          return (
            <Link
              to={`/recipe/${meal.idMeal}`}
              key={meal.idMeal}
              className="text-xl no-underline font-bold text-gray-500 cursor-pointer"
            >
              <section className="flex gap-3 items-start">
                <img
                  alt={meal.strMeal}
                  src={meal.strMealThumb}
                  className="w-16"
                />
                <p>{meal.strMeal}</p>
              </section>
            </Link>
          );
        })}
    </div>
  );
}

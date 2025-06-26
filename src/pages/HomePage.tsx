import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

// { categories: [  {
//       idCategory: '1';
//       strCategory: 'Beef';
//       strCategoryThumb: 'https://www.themealdb.com/images/category/beef.png';
//       strCategoryDescription: 'Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]';
//     }   ]; };

export function HomePage() {
  const [categories, setCategories] = useState<Category[]>();

  const { error, data, loading } = useFetch(
    'https://www.themealdb.com/api/json/v1/1/categories.php'
  );
  useEffect(() => console.log('Loading:', loading), [loading]);
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);
  useEffect(() => {
    if (data && data.categories && data.categories.length)
      setCategories(data.categories);
  }, [data]);

  if (loading) return <LoadingSpinner text="Loading categories..." />;
  if (!categories || categories.length === 0)
    return <ErrorMessage text="No categories found." />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <ErrorMessage text={error?.message || ''} />
      {categories &&
        categories.map(cat => {
          return (
            <Link
              to={`/category/${cat.strCategory}`}
              key={cat.idCategory}
              className="text-xl no-underline font-bold text-gray-500 cursor-pointer"
            >
              <section className="flex gap-3 items-center">
                <img
                  alt={cat.strCategory}
                  src={cat.strCategoryThumb}
                  className="w-16"
                />
                <p>{cat.strCategory}</p>
              </section>
            </Link>
          );
        })}
    </div>
  );
}

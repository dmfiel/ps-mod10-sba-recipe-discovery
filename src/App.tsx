import './App.css';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import ThemeProvider, {
  ThemeButton,
  ThemeContext
} from './context/ThemeContext';
import FavoritesProvider from './context/FavoritesContext';

import NavBar from './components/NavBar/NavBar';
import { HomePage } from './pages/HomePage';
import { Category } from './pages/Category';
import { NotFoundPage } from './pages/NotFoundPage';
import { Recipe } from './pages/Recipe';
import { FavoritesPage } from './pages/FavoritesPage';
import { Search } from './pages/SearchPage';
import { SearchBar } from './components/SearchBar/SearchBar';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <ThemeWrapper />
      </FavoritesProvider>
    </ThemeProvider>
  );
}

function ThemeWrapper() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      id="all"
      className={`${theme} w-full h-full bg:white dark:bg-black text-black dark:text-white flex flex-col min-h-screen px-5 pt-5`}
    >
      <h1 className="text-3xl font-bold mx-auto">Recipe Discovery</h1>
      <header className="flex justify-between gap-10 mt-10 items-center">
        <NavBar />
        <SearchBar />
        <ThemeButton />
      </header>
      <main className="mx-auto my-5 flex-1 flex flex-col gap-5 items-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/category/:strCategory" element={<Category />} />
          <Route path="/search/:searchText" element={<Search />} />
          <Route path="/recipe/:idMeal" element={<Recipe />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer role="contentinfo">
        <a
          href="https://www.flaticon.com/free-icons/letter-f"
          title="letter f icons"
          target="_blank"
          className="text-center text-xs text-gray-500"
        >
          <p>Letter f icons created by rashedul.islam - Flaticon</p>{' '}
        </a>{' '}
      </footer>{' '}
    </div>
  );
}
export default App;

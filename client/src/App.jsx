import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainAppBar from './components/MainAppBar';
import HomePage from './pages/HomePage';
import NewBookPage from './pages/NewBookPage';
import FavoritesPage from './pages/FavoritesPage';
import AboutPage from './pages/AboutPage';

const App = () => {
  return (
    <>
      <MainAppBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} exact />
          <Route path='/new-book' element={<NewBookPage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

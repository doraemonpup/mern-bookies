import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainAppBar from './components/MainAppBar';
import Home from './pages/Home';
import NewBook from './pages/NewBook';
import Favorites from './pages/Favorites';
import About from './pages/About';

const App = () => {
  return (
    <>
      <MainAppBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/new-book' element={<NewBook />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

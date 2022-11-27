import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainAppBar from './components/MainAppBar';
import Dashboard from './pages/Dashboard';
import NewBook from './pages/NewBook';
import About from './pages/About';

const App = () => {
  return (
    <>
      <MainAppBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} exact />
          <Route path='/new-book' element={<NewBook />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

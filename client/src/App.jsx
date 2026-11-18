import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppShell from './components/AppShell'
import HomePage from './pages/HomePage'
import NewBookPage from './pages/NewBookPage'
import EditBookPage from './pages/EditBookPage'
import FavoritesPage from './pages/FavoritesPage'
import AboutPage from './pages/AboutPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/new-book' element={<NewBookPage />} />
          <Route path='/edit-book/:id' element={<EditBookPage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

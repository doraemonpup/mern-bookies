import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { BooksContextProvider } from './context/BookContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BooksContextProvider>
      <App />
    </BooksContextProvider>
  </React.StrictMode>
)

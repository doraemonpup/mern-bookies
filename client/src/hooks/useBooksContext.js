import { useContext } from 'react'
import { BooksContext } from '../context/BookContext'

export const useBooksContext = () => {
  const context = useContext(BooksContext)

  if (!context) {
    throw new Error(
      'useBooksContext must be use inside an BooksContextProvider'
    )
  }

  return context
}

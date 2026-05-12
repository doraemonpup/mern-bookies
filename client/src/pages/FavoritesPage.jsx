import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookCard from '../components/books/BookCard'
import { fetchData, deleteData } from '../helper'

const FavoritesPage = () => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  const triggerRefresh = useCallback(() => setRefreshKey(k => k + 1), [])

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true)
      const res = await fetchData('http://localhost:4000/books')
      if (res.status === 200) {
        setBooks(res.data.filter(book => book.favorite))
      }
      setIsLoading(false)
    }
    fetchAll()
  }, [refreshKey])

  const handleDelete = async id => {
    const res = await deleteData(`http://localhost:4000/books/${id}`)
    if (res.status === 200) {
      triggerRefresh()
    }
  }

  return (
    <Box sx={{ width: '80%', maxWidth: 1200, mx: 'auto', my: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box
          sx={{
            display: 'inline-flex',
            p: 1.5,
            borderRadius: 3,
            bgcolor: 'rgba(250, 200, 152, 0.2)',
            color: 'primary.dark',
            mb: 2,
          }}
        >
          <FavoriteIcon sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant='h3' fontWeight={700} sx={{ mb: 1 }}>
          My Favorites
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          sx={{ fontSize: '1.1rem' }}
        >
          Books you have saved as favorites.
        </Typography>
      </Box>

      {isLoading ? (
        <Typography align='center' color='text.secondary' sx={{ mt: 8 }}>
          Loading...
        </Typography>
      ) : books.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <FavoriteIcon
            sx={{ fontSize: 64, color: 'action.disabled', mb: 2 }}
          />
          <Typography variant='h6' color='text.secondary' sx={{ mb: 1 }}>
            No favorites yet
          </Typography>
          <Typography variant='body2' color='text.disabled'>
            Click the heart icon on any book to add it here.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 5,
            py: 4,
          }}
        >
          {books.map(book => (
            <Box key={book._id}>
              <BookCard
                data={{
                  id: book._id,
                  title: book.title,
                  author: book.author,
                  imageUrl: book.imageUrl,
                  description: book.description,
                  rating: book.rating,
                  favorite: book.favorite,
                }}
                handleDelete={handleDelete}
                onToggleFavorite={triggerRefresh}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default FavoritesPage

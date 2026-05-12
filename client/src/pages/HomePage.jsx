import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import StarIcon from '@mui/icons-material/Star'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import { fetchData, deleteData } from '../helper'
import { baseBoxStyle } from '../constants'
import BookList from '../components/books/BookList'
import { useBooksContext } from '../hooks/useBooksContext'

const HomePage = () => {
  const { books, dispatch } = useBooksContext()
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    setIsLoading(true)
    const getAllBooks = async url => {
      const res = await fetchData(url)

      if (res.status !== 200) {
        console.log('Something went wrong')
        return
      }

      setIsLoading(false)
      dispatch({ type: 'SET_BOOKS', payload: res.data })
    }

    getAllBooks('http://localhost:4000/books')
  }, [dispatch])

  const promptDelete = id => setDeleteTarget(id)

  const confirmDelete = async () => {
    const res = await deleteData(
      `http://localhost:4000/books/${deleteTarget}`
    )

    if (res.status !== 200) {
      console.log('Something went wrong')
      return
    }

    dispatch({ type: 'DELETE_BOOK', payload: res.data })
    setDeleteTarget(null)
  }

  if (isLoading) {
    return <Box sx={baseBoxStyle}>Loading ...</Box>
  }

  const count = books?.length || 0
  const avgRating = count
    ? (books.reduce((sum, b) => sum + (b.rating || 0), 0) / count).toFixed(1)
    : null
  const favCount = books?.filter(b => b.favorite).length || 0

  const sortedBooks = [...(books || [])].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
    if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
    if (sortBy === 'topRated') return (b.rating || 0) - (a.rating || 0)
    return 0
  })

  const sortOptions = [
    { value: 'newest', label: 'Most recent' },
    { value: 'topRated', label: 'Top Rated' },
    { value: 'oldest', label: 'Earliest' },
  ]

  return (
    <Box sx={baseBoxStyle}>
      <Box sx={{ textAlign: 'center', mb: 3, mt: 1 }}>
        <Box
          sx={{
            display: 'inline-flex',
            p: 1.5,
            borderRadius: 3,
            bgcolor: 'rgba(250, 200, 152, 0.2)',
            color: 'primary.dark',
            mb: 1.5,
          }}
        >
          <MenuBookIcon sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant='h3' fontWeight={700} sx={{ mb: 0.5 }}>
          {count > 0 ? 'Your Library' : 'Welcome to Bookies'}
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          sx={{ fontSize: '1.1rem', mb: 2 }}
        >
          {count > 0
            ? 'Every book tells a story — here are yours.'
            : 'Start building your book collection.'}
        </Typography>
        {count > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Chip
              icon={<AutoStoriesIcon />}
              label={`${count} ${count === 1 ? 'book' : 'books'}`}
              sx={{
                bgcolor: 'rgba(250, 200, 152, 0.15)',
                color: 'primary.dark',
                fontWeight: 600,
              }}
            />
            {avgRating && (
              <Chip
                icon={<StarIcon />}
                label={`${avgRating} avg rating`}
                sx={{
                  bgcolor: 'rgba(250, 200, 152, 0.15)',
                  color: 'primary.dark',
                  fontWeight: 600,
                }}
              />
            )}
            {favCount > 0 && (
              <Chip
                label={`${favCount} ${favCount === 1 ? 'favorite' : 'favorites'}`}
                sx={{
                  bgcolor: 'rgba(250, 200, 152, 0.15)',
                  color: 'primary.dark',
                  fontWeight: 600,
                }}
              />
            )}
          </Box>
        )}

        {count > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2.5 }}>
            {sortOptions.map(opt => (
              <Button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                size='small'
                sx={{
                  textTransform: 'none',
                  fontWeight: sortBy === opt.value ? 700 : 500,
                  color: sortBy === opt.value ? 'primary.dark' : 'text.secondary',
                  bgcolor: sortBy === opt.value ? 'rgba(250, 200, 152, 0.15)' : 'transparent',
                  borderRadius: 2,
                  px: 2,
                  minWidth: 0,
                  '&:hover': {
                    bgcolor: 'rgba(250, 200, 152, 0.15)',
                    color: 'primary.dark',
                  },
                }}
              >
                {opt.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>

      {count > 0 ? (
        <BookList books={sortedBooks} handleDelete={promptDelete} />
      ) : (
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <AutoStoriesIcon
            sx={{ fontSize: 72, color: 'action.disabled', mb: 2 }}
          />
          <Typography variant='h6' color='text.secondary' sx={{ mb: 1 }}>
            No books yet
          </Typography>
          <Typography variant='body2' color='text.disabled' sx={{ mb: 3 }}>
            Add your first book to get started.
          </Typography>
          <Button
            variant='contained'
            href='/new-book'
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1.2,
              fontSize: '1rem',
            }}
          >
            Add a Book
          </Button>
        </Box>
      )}

      <Dialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            px: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
          Delete this book?
        </DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <DialogContentText color='text.secondary'>
            This action cannot be undone. The book will be permanently removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setDeleteTarget(null)}
            sx={{ color: 'text.secondary', textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant='contained'
            sx={{
              bgcolor: '#e57373',
              textTransform: 'none',
              '&:hover': { bgcolor: '#ef5350' },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default HomePage

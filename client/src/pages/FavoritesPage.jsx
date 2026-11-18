import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import BookList, { mapBook } from '../components/books/BookList'
import BookDetailDialog from '../components/books/BookDetailDialog'
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog'
import PageHeader from '../components/PageHeader'
import { fetchData, deleteData } from '../helper'

const FavoritesPage = () => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [dialogBook, setDialogBook] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const triggerRefresh = useCallback(() => setRefreshKey(k => k + 1), [])

  useEffect(() => {
    let cancelled = false

    const fetchAll = async () => {
      setIsLoading(true)
      try {
        const res = await fetchData('http://localhost:4000/books')
        if (!cancelled && res.status === 200) {
          setBooks(res.data.filter(book => book.favorite))
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchAll()
    return () => {
      cancelled = true
    }
  }, [refreshKey])

  const promptDelete = id => setDeleteTarget(id)

  const confirmDelete = async () => {
    const res = await deleteData(`http://localhost:4000/books/${deleteTarget}`)
    if (res.status === 200) {
      setDeleteTarget(null)
      setDialogBook(null)
      triggerRefresh()
    }
  }

  if (isLoading) {
    return (
      <Box>
        <Box sx={{ textAlign: 'center', pt: { xs: 4, md: 8 }, pb: 4 }}>
          <Skeleton
            variant='rounded'
            height={56}
            width={320}
            sx={{ mx: 'auto', borderRadius: '8px' }}
          />
          <Skeleton height={24} width={280} sx={{ mx: 'auto', mt: 1.5 }} />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 4 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant='rounded' height={430} sx={{ borderRadius: '18px' }} />
          ))}
        </Box>
      </Box>
    )
  }

  const bestLoved = [...books].sort((a, b) => (b.rating || 0) - (a.rating || 0))
  const collageBooks = bestLoved.slice(0, 5)
  const mid = (collageBooks.length - 1) / 2

  return (
    <Box>
      <PageHeader
        title='Saved books.'
        subtitle={
          books.length > 0
            ? `${books.length} ${books.length === 1 ? 'book' : 'books'} you didn't want to forget.`
            : 'Books you save with a bookmark show up here.'
        }
        action={
          books.length === 0 && (
            <Button
              component={Link}
              to='/'
              variant='contained'
              size='large'
              sx={{ mt: 4 }}
            >
              Go to library
            </Button>
          )
        }
      />

      {books.length > 0 && (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: { xs: 2, md: 4 },
              pb: { xs: 4, md: 6 },
              px: 2,
            }}
          >
            {collageBooks.map((book, i) => {
              const offset = i - mid
              const rest = Math.abs(offset)
              return (
                <Box
                  key={book._id}
                  component='button'
                  type='button'
                  aria-label={`Show details for ${book.title}`}
                  onClick={() => setDialogBook(book)}
                  sx={{
                    width: { xs: 84, md: 128 },
                    flexShrink: 0,
                    ml: i === 0 ? 0 : { xs: -6, md: -7 },
                    bgcolor: 'transparent',
                    border: 'none',
                    p: 0,
                    position: 'relative',
                    zIndex: 10 - rest,
                    cursor: 'pointer',
                    transform: `rotate(${offset * 5}deg) translateY(${rest * 8}px)`,
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      zIndex: 20,
                      transform: `rotate(${offset * 5}deg) translateY(${rest * 8 - 12}px) scale(1.05)`,
                    },
                    '&:focus-visible': {
                      outline: '2px solid',
                      outlineColor: 'primary.main',
                      outlineOffset: 3,
                    },
                  }}
                >
                  <Box
                    component='img'
                    src={book.imageUrl}
                    alt={book.title}
                    sx={{
                      width: '100%',
                      aspectRatio: '2 / 3',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
                      display: 'block',
                    }}
                  />
                </Box>
              )
            })}
          </Box>

          <Box sx={{ width: '100vw', ml: 'calc(50% - 50vw)', bgcolor: '#F5F5F7' }}>
            <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2.5, md: 3 }, py: { xs: 5, md: 7 } }}>
              <BookList
                books={bestLoved}
                view='gallery'
                handleDelete={promptDelete}
                onToggleFavorite={triggerRefresh}
              />
            </Box>
          </Box>
        </>
      )}

      {dialogBook && (
        <BookDetailDialog
          open={!!dialogBook}
          onClose={() => setDialogBook(null)}
          data={mapBook(dialogBook)}
          handleDelete={promptDelete}
          onToggleFavorite={triggerRefresh}
        />
      )}

      <ConfirmDeleteDialog
        open={deleteTarget !== null}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </Box>
  )
}

export default FavoritesPage

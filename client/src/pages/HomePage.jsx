import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'
import SearchIcon from '@mui/icons-material/Search'
import { fetchData, deleteData } from '../helper'
import BookList, { mapBook } from '../components/books/BookList'
import BookDetailDialog from '../components/books/BookDetailDialog'
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog'
import { useBooksContext } from '../hooks/useBooksContext'

const gridSx = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: 4,
}

const GridSkeleton = () => (
  <Box sx={gridSx}>
    {Array.from({ length: 6 }).map((_, i) => (
      <Box key={i}>
        <Skeleton variant='rounded' height={420} sx={{ borderRadius: '18px' }} />
        <Skeleton height={24} width='70%' sx={{ mt: 2, mx: 1 }} />
        <Skeleton height={18} width='40%' sx={{ mx: 1 }} />
      </Box>
    ))}
  </Box>
)

// Full-bleed section inside the centered container.
const bandSx = {
  width: '100vw',
  ml: 'calc(50% - 50vw)',
  bgcolor: '#F5F5F7',
}

const HomePage = () => {
  const { books, dispatch } = useBooksContext()
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [sortBy, setSortBy] = useState('newest')
  const [search, setSearch] = useState('')
  const [view, setView] = useState('grid')
  const [refreshKey, setRefreshKey] = useState(0)
  const [featuredOpen, setFeaturedOpen] = useState(false)

  useEffect(() => {
    let cancelled = false

    const getAllBooks = async () => {
      setIsLoading(true)
      try {
        const res = await fetchData('http://localhost:4000/books')
        if (!cancelled && res.status === 200) {
          dispatch({ type: 'SET_BOOKS', payload: res.data })
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    getAllBooks()
    return () => {
      cancelled = true
    }
  }, [dispatch, refreshKey])

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

  const count = books?.length || 0

  const sortedBooks = [...(books || [])].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
    if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
    if (sortBy === 'topRated') return (b.rating || 0) - (a.rating || 0)
    return 0
  })

  const featuredBook = count
    ? [...(books || [])].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )[0]
    : null

  const query = search.trim().toLowerCase()
  const filteredBooks = query
    ? sortedBooks.filter(
        book =>
          book.title?.toLowerCase().includes(query) ||
          book.author?.toLowerCase().includes(query)
      )
    : sortedBooks

  if (isLoading) {
    return (
      <Box>
        <Box sx={{ textAlign: 'center', pt: { xs: 4, md: 8 }, pb: { xs: 4, md: 6 } }}>
          <Skeleton
            variant='rounded'
            height={64}
            width={420}
            sx={{ mx: 'auto', borderRadius: '8px' }}
          />
          <Skeleton height={26} width={340} sx={{ mx: 'auto', mt: 1.5 }} />
          <Skeleton variant='rounded' height={420} width={320} sx={{ mx: 'auto', mt: 6, borderRadius: '12px' }} />
        </Box>
        <Box sx={bandSx}>
          <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2.5, md: 3 }, py: { xs: 5, md: 7 } }}>
            <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
              <Skeleton variant='rounded' width={300} height={40} />
              <Skeleton variant='rounded' width={130} height={40} sx={{ ml: 'auto' }} />
            </Box>
            <GridSkeleton />
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      {count > 0 ? (
        <>
          <Box sx={{ textAlign: 'center', pt: { xs: 3, md: 6 }, pb: { xs: 5, md: 7 } }}>
            <Typography
              variant='h1'
              sx={{ fontSize: { xs: '2.5rem', md: '4.25rem' } }}
            >
              Your library.
            </Typography>
            <Typography
              color='text.secondary'
              sx={{ fontSize: { xs: '1.05rem', md: '1.3rem' }, mt: 1 }}
            >
              Every book you love, in one place.
            </Typography>

            {featuredBook && (
              <Box
                onClick={() => setFeaturedOpen(true)}
                sx={{
                  mt: { xs: 5, md: 7 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', mb: 2 }}>
                  Recently added
                </Typography>
                <Box
                  component='img'
                  src={featuredBook.imageUrl}
                  alt={featuredBook.title}
                  sx={{
                    height: { xs: 320, md: 440 },
                    maxWidth: '100%',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.16)',
                  }}
                />
                <Typography
                  sx={{ mt: 3, fontWeight: 600, fontSize: '1.25rem', letterSpacing: '-0.01em' }}
                >
                  {featuredBook.title}
                </Typography>
                {featuredBook.rating !== null && featuredBook.rating !== undefined && (
                  <Typography variant='body2' color='text.secondary' sx={{ mt: 0.25 }}>
                    {featuredBook.rating} / 10
                  </Typography>
                )}
              </Box>
            )}
          </Box>

          <Box sx={bandSx}>
            <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2.5, md: 3 }, py: { xs: 5, md: 7 } }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  flexWrap: 'wrap',
                  mb: 5,
                }}
              >
                <TextField
                  size='small'
                  placeholder='Search by title or author'
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  sx={{ flexGrow: 1, maxWidth: 360 }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <SearchIcon fontSize='small' sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Box sx={{ flexGrow: 1 }} />
                <ToggleButtonGroup
                  size='small'
                  exclusive
                  value={view}
                  onChange={(e, value) => value && setView(value)}
                  aria-label='View'
                >
                  <ToggleButton value='grid' aria-label='Grid view'>
                    <GridViewIcon fontSize='small' />
                  </ToggleButton>
                  <ToggleButton value='list' aria-label='List view'>
                    <ViewListIcon fontSize='small' />
                  </ToggleButton>
                </ToggleButtonGroup>
                <TextField
                  select
                  size='small'
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  sx={{ width: 150 }}
                  aria-label='Sort books'
                >
                  <MenuItem value='newest'>Most recent</MenuItem>
                  <MenuItem value='topRated'>Top rated</MenuItem>
                  <MenuItem value='oldest'>Earliest</MenuItem>
                </TextField>
              </Box>

              {filteredBooks.length > 0 ? (
                <BookList
                  books={filteredBooks}
                  view={view}
                  handleDelete={promptDelete}
                  onToggleFavorite={() => setRefreshKey(k => k + 1)}
                />
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant='h3' color='text.secondary' sx={{ mb: 1 }}>
                    No books match “{search.trim()}”
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Try a different title or author.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {featuredBook && (
            <BookDetailDialog
              open={featuredOpen}
              onClose={() => setFeaturedOpen(false)}
              data={mapBook(featuredBook)}
              handleDelete={promptDelete}
              onToggleFavorite={() => setRefreshKey(k => k + 1)}
            />
          )}
        </>
      ) : (
        <Box sx={{ textAlign: 'center', pt: { xs: 6, md: 12 }, pb: 10 }}>
          <Typography variant='h1' sx={{ fontSize: { xs: '2.5rem', md: '4.25rem' } }}>
            Welcome to Bookies.
          </Typography>
          <Typography
            color='text.secondary'
            sx={{ fontSize: { xs: '1.05rem', md: '1.3rem' }, mt: 1, mb: 4 }}
          >
            Start building your book collection.
          </Typography>
          <Button component={Link} to='/new-book' variant='contained' size='large'>
            Add a book
          </Button>
        </Box>
      )}

      <ConfirmDeleteDialog
        open={deleteTarget !== null}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </Box>
  )
}

export default HomePage

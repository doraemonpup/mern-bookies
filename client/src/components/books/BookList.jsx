import Box from '@mui/material/Box'
import BookCard from './BookCard'
import BookRow from './BookRow'
import GalleryCard from './GalleryCard'

export const mapBook = book => ({
  id: book._id,
  title: book.title,
  author: book.author,
  imageUrl: book.imageUrl,
  description: book.description,
  rating: book.rating,
  pages: book.pages,
  favorite: book.favorite,
})

const BookList = ({ books, view = 'grid', handleDelete, onToggleFavorite }) => {
  if (view === 'list') {
    return (
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        {books.map(book => (
          <BookRow
            key={book._id}
            data={mapBook(book)}
            handleDelete={handleDelete}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </Box>
    )
  }

  if (view === 'gallery') {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 4,
        }}
      >
        {books.map(book => (
          <Box key={book._id}>
            <GalleryCard
              data={mapBook(book)}
              handleDelete={handleDelete}
              onToggleFavorite={onToggleFavorite}
            />
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 4,
      }}
    >
      {books.map(book => (
        <Box key={book._id}>
          <BookCard
            data={mapBook(book)}
            handleDelete={handleDelete}
            onToggleFavorite={onToggleFavorite}
          />
        </Box>
      ))}
    </Box>
  )
}

export default BookList

import Box from '@mui/material/Box'
import BookCard from './BookCard'

const BookList = ({ books, handleDelete }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: 5,
        py: 4,
      }}
    >
      {books.map(book => {
        const bookData = {
          id: book._id,
          title: book.title,
          author: book.author,
          imageUrl: book.imageUrl,
          description: book.description,
          rating: book.rating,
        }

        return (
          <Box key={book._id}>
            <BookCard data={bookData} handleDelete={handleDelete} />
          </Box>
        )
      })}
    </Box>
  )
}

export default BookList

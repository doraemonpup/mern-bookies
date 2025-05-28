import Grid from '@mui/material/Grid'
import BookCard from './BookCard'
import Box from '@mui/material/Box'

const BookList = ({ books, handleDelete }) => {
  return (
    <Box sx={{ width: '100%', py: 4 }}>
      <Grid container spacing={4} columns={12} alignItems='stretch'>
        {books.map(book => {
          // assembly data of a book in one object
          const bookData = {
            id: book._id,
            title: book.title,
            author: book.author,
            imageUrl: book.imageUrl,
            description: book.description,
            rating: book.rating,
          }

          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={book._id}
              sx={{ display: 'flex' }}
            >
              <BookCard data={bookData} handleDelete={handleDelete} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default BookList

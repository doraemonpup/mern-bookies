import Grid from '@mui/material/Grid'
import BookCard from './BookCard'
import Container from '@mui/material/Container'

const BookList = ({ books, handleDelete }) => {
  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      <Grid container spacing={6} justifyContent='center'>
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
              lg={4}
              xl={3}
              key={book._id}
              sx={{
                display: 'flex',
                maxWidth: '100%',
              }}
            >
              <BookCard data={bookData} handleDelete={handleDelete} />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default BookList

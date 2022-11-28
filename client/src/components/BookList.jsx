import Grid from '@mui/material/Grid';
import BookCard from './BookCard';

const BookList = ({ books, handleDelete }) => {
  return (
    <Grid container columns={16}>
      {books.map(book => {
        // assembly data of a book in one object
        const bookData = {
          id: book._id,
          title: book.title,
          author: book.author,
          imageUrl: book.imageUrl,
          description: book.description,
          rating: book.rating,
        };

        return (
          <Grid item sm={16} md={8} xl={4} key={book._id}>
            <BookCard data={bookData} handleDelete={handleDelete} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BookList;

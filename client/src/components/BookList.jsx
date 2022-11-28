import { useState, useEffect } from 'react';
import { fetchData, deleteData } from '../helper';
import Grid from '@mui/material/Grid';
import BookCard from './BookCard';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getAllBooks = async url => {
      const res = await fetchData(url);

      if (res.status !== 200) {
        console.log('Something went wrong');
        return;
      }

      setBooks(res.data); // axios specific xxx.data
    };

    getAllBooks('http://localhost:4000/books');
  }, []);

  const deleteBook = async e => {
    e.preventDefault();
    const res = await deleteData(
      `http://localhost:4000/books/${e.currentTarget.id}`
    );

    if (res.status !== 200) {
      console.log('Something went wrong');
      return;
    }

    console.log('Deleted successfully');
  };

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
            <BookCard data={bookData} handleDelete={deleteBook} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BookList;

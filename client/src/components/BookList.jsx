import { useState, useEffect } from 'react';
import { fetchData } from '../helper';
import Grid from '@mui/material/Grid';
import BookCard from './BookCard';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async url => {
      const data = await fetchData(url);
      setBooks(data);
    };

    getBooks('http://localhost:4000/books');
  }, []);

  return (
    <Grid container columns={16}>
      {books.map(book => {
        const bookData = {
          title: book.title,
          author: book.author,
          imageUrl: book.imageUrl,
          description: book.description,
          rating: book.rating,
        };

        return (
          <Grid key={book.title} item sm={16} md={8} lg={4}>
            <BookCard data={bookData} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BookList;

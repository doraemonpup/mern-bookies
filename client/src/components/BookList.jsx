import { useState, useEffect } from 'react';
import { fetchData } from '../helper/helper';

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
    <>
      {books.map(book => {
        return (
          <div key={book._id}>
            <h2>{book.title}</h2>
            <p>Athor: {book.author}</p>
            <p>Description: {book.description}</p>
            <p>Rating: {book.rating}</p>
            <br />
          </div>
        );
      })}
    </>
  );
};

export default BookList;

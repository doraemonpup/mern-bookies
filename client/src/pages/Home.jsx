import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fetchData, deleteData } from '../helper';
import { baseBoxStyle } from '../constants';
import BookList from '../components/books/BookList';
import { useBooksContext } from '../hooks/useBooksContext';

const Home = () => {
  const { books, dispatch } = useBooksContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getAllBooks = async url => {
      const res = await fetchData(url);

      if (res.status !== 200) {
        console.log('Something went wrong');
        return;
      }

      setIsLoading(false);
      dispatch({ type: 'SET_BOOKS', payload: res.data }); // axios specific xxx.data
    };

    getAllBooks('http://localhost:4000/books');
  }, []);

  const deleteBook = async e => {
    const res = await deleteData(
      `http://localhost:4000/books/${e.currentTarget.id}`
    );

    if (res.status !== 200) {
      console.log('Something went wrong');
      return;
    }

    console.log('Deleted successfully');
  };

  if (isLoading) {
    return <Box sx={baseBoxStyle}>Loading ...</Box>;
  }

  return (
    <Box sx={baseBoxStyle}>
      <Typography gutterBottom variant='h3' align='center'>
        All Books
      </Typography>
      <BookList books={books} handleDelete={deleteBook} />
    </Box>
  );
};

export default Home;

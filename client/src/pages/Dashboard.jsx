import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fetchData, deleteData } from '../helper';
import BookList from '../components/books/BookList';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const boxStyle = { my: 4, mx: 'auto', width: '90%' };

  useEffect(() => {
    setIsLoading(true);
    const getAllBooks = async url => {
      const res = await fetchData(url);

      if (res.status !== 200) {
        console.log('Something went wrong');
        return;
      }

      setIsLoading(false);
      setBooks(res.data); // axios specific xxx.data
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
    return <Box sx={boxStyle}>Loading ...</Box>;
  }

  return (
    <Box sx={boxStyle}>
      <Typography variant='h3'>All Books</Typography>
      <BookList books={books} handleDelete={deleteBook} />
    </Box>
  );
};

export default Dashboard;

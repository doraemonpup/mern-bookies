import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NewBookForm from '../components/books/NewBookForm';
import { addData } from '../helper';
import { baseBoxStyle } from '../constants';
import { useNavigate } from 'react-router-dom';

const NewBookPage = () => {
  const navigate = useNavigate();

  const handleAddBook = async bookData => {
    const res = await addData('http://localhost:4000/books', bookData);

    if (res.status !== 201) {
      console.log('Something went wrong');
      return;
    }

    console.log('Successfully added a new book!');
    navigate('/', { replace: true });
  };

  return (
    <Box sx={baseBoxStyle}>
      <Typography gutterBottom variant='h3' align='center'>
        Add New Book
      </Typography>
      <NewBookForm onAddBook={handleAddBook}></NewBookForm>
    </Box>
  );
};

export default NewBookPage;

import BookList from '../components/BookList';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Dashboard = () => {
  return (
    <Box sx={{ m: 4 }}>
      <Typography variant='h3'>All Books</Typography>
      <BookList />
    </Box>
  );
};

export default Dashboard;

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import NewBookForm from '../components/books/NewBookForm'
import { addData } from '../helper'
import { useNavigate } from 'react-router-dom'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

const NewBookPage = () => {
  const navigate = useNavigate()

  const handleAddBook = async bookData => {
    const res = await addData('http://localhost:4000/books', bookData)

    if (res.status !== 201) {
      console.log('Something went wrong')
      return
    }

    console.log('Successfully added a new book!')
    navigate('/', { replace: true })
  }

  return (
    <Box sx={{ width: '80%', maxWidth: 800, mx: 'auto', my: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box
          sx={{
            display: 'inline-flex',
            p: 1.5,
            borderRadius: 3,
            bgcolor: 'rgba(250, 200, 152, 0.2)',
            color: 'primary.dark',
            mb: 2,
          }}
        >
          <NoteAddIcon sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant='h3' fontWeight={700} sx={{ mb: 1 }}>
          Add a New Book
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          sx={{ fontSize: '1.1rem' }}
        >
          Share a new title with the Bookies community.
        </Typography>
      </Box>

      <NewBookForm onSubmit={handleAddBook} />
    </Box>
  )
}

export default NewBookPage

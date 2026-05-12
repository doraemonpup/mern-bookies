import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import NewBookForm from '../components/books/NewBookForm'
import { fetchData, updateData } from '../helper'
import EditIcon from '@mui/icons-material/Edit'

const EditBookPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getBook = async () => {
      const res = await fetchData(`http://localhost:4000/books/${id}`)
      if (res.status === 200) {
        setBook(res.data)
      }
      setIsLoading(false)
    }
    getBook()
  }, [id])

  const handleUpdate = async bookData => {
    const res = await updateData(
      `http://localhost:4000/books/${id}`,
      bookData
    )

    if (res.status !== 200) {
      console.log('Something went wrong')
      return
    }

    navigate('/', { replace: true })
  }

  if (isLoading) {
    return (
      <Box sx={{ width: '80%', maxWidth: 800, mx: 'auto', my: 6 }}>
        <Typography align='center' color='text.secondary'>
          Loading...
        </Typography>
      </Box>
    )
  }

  if (!book) {
    return (
      <Box sx={{ width: '80%', maxWidth: 800, mx: 'auto', my: 6 }}>
        <Typography align='center' color='text.secondary'>
          Book not found.
        </Typography>
      </Box>
    )
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
          <EditIcon sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant='h3' fontWeight={700} sx={{ mb: 1 }}>
          Edit Book
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          sx={{ fontSize: '1.1rem' }}
        >
          Update the details for "{book.title}".
        </Typography>
      </Box>

      <NewBookForm initialData={book} onSubmit={handleUpdate} />
    </Box>
  )
}

export default EditBookPage

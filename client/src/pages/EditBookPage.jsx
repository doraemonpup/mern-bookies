import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import NewBookForm from '../components/books/NewBookForm'
import PageHeader from '../components/PageHeader'
import { fetchData, updateData } from '../helper'

const EditBookPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const getBook = async () => {
      setIsLoading(true)
      try {
        const res = await fetchData(`http://localhost:4000/books/${id}`)
        if (!cancelled && res.status === 200) {
          setBook(res.data)
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    getBook()
    return () => {
      cancelled = true
    }
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
      <Box sx={{ maxWidth: 640, mx: 'auto', my: 6 }}>
        <Typography align='center' color='text.secondary'>
          Loading...
        </Typography>
      </Box>
    )
  }

  if (!book) {
    return (
      <Box sx={{ maxWidth: 640, mx: 'auto', my: 6 }}>
        <Typography align='center' color='text.secondary'>
          Book not found.
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title='Edit book.'
        subtitle={`Update the details for "${book.title}".`}
      />
      <NewBookForm initialData={book} onSubmit={handleUpdate} />
    </Box>
  )
}

export default EditBookPage

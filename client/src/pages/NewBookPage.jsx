import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import NewBookForm from '../components/books/NewBookForm'
import PageHeader from '../components/PageHeader'
import { addData } from '../helper'

const NewBookPage = () => {
  const navigate = useNavigate()

  const handleAddBook = async bookData => {
    const res = await addData('http://localhost:4000/books', bookData)

    if (res.status !== 201) {
      console.log('Something went wrong')
      return
    }

    navigate('/', { replace: true })
  }

  return (
    <Box>
      <PageHeader
        title='Add a book.'
        subtitle='Watch your book take shape as you type.'
      />
      <NewBookForm onSubmit={handleAddBook} />
    </Box>
  )
}

export default NewBookPage

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { fetchData, deleteData } from '../helper'
import { baseBoxStyle } from '../constants'
import BookList from '../components/books/BookList'
import { useBooksContext } from '../hooks/useBooksContext'

const HomePage = () => {
  const { books, dispatch } = useBooksContext()
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    const getAllBooks = async url => {
      const res = await fetchData(url)

      if (res.status !== 200) {
        console.log('Something went wrong')
        return
      }

      setIsLoading(false)
      dispatch({ type: 'SET_BOOKS', payload: res.data })
    }

    getAllBooks('http://localhost:4000/books')
  }, [dispatch])

  const promptDelete = id => setDeleteTarget(id)

  const confirmDelete = async () => {
    const res = await deleteData(
      `http://localhost:4000/books/${deleteTarget}`
    )

    if (res.status !== 200) {
      console.log('Something went wrong')
      return
    }

    dispatch({ type: 'DELETE_BOOK', payload: res.data })
    setDeleteTarget(null)
  }

  if (isLoading) {
    return <Box sx={baseBoxStyle}>Loading ...</Box>
  }

  return (
    <Box sx={baseBoxStyle}>
      <Typography gutterBottom variant='h3' align='center'>
        All Books
      </Typography>
      <BookList books={books} handleDelete={promptDelete} />
      <Dialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            px: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
          Delete this book?
        </DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <DialogContentText color='text.secondary'>
            This action cannot be undone. The book will be permanently removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setDeleteTarget(null)}
            sx={{ color: 'text.secondary', textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant='contained'
            sx={{
              bgcolor: '#e57373',
              textTransform: 'none',
              '&:hover': { bgcolor: '#ef5350' },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default HomePage

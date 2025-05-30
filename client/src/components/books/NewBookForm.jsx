import { useRef, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'

const NewBookForm = props => {
  const titleInputRef = useRef()
  const authorInputRef = useRef()
  const descriptionInputRef = useRef()
  const imageUrlInputRef = useRef()
  const pagesInputRef = useRef()
  const ratingInputRef = useRef()
  const [error, setError] = useState('')
  const [descLength, setDescLength] = useState(0)

  const handleSubmit = e => {
    e.preventDefault()
    setError('')

    const description = descriptionInputRef.current.value
    if (description.length > 1000) {
      setError('Description must be 1000 characters or less')
      return
    }

    const newBookData = {
      title: titleInputRef.current.value,
      author: authorInputRef.current.value,
      description: description,
      imageUrl: imageUrlInputRef.current.value,
      pages: parseInt(pagesInputRef.current.value),
      rating: parseInt(ratingInputRef.current.value),
    }

    props.onAddBook(newBookData).catch(err => {
      if (err.response?.status === 409) {
        setError('A book with this title already exists')
      } else {
        setError('Something went wrong. Please try again.')
      }
    })
  }

  const handleDescriptionChange = e => {
    setDescLength(e.target.value.length)
    if (e.target.value.length > 1000) {
      setError('Description must be 1000 characters or less')
    } else {
      setError('')
    }
  }

  return (
    <Card
      sx={{ maxWidth: 600, mx: 'auto', my: 4, boxShadow: 3, borderRadius: 2 }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant='body1'
          sx={{
            mb: 3,
            fontWeight: 600,
          }}
        >
          Fill up the form to add a new book.
        </Typography>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label='Title'
              placeholder='Enter book title'
              variant='outlined'
              fullWidth
              required
              inputRef={titleInputRef}
              sx={{ '& .MuiInputBase-root': { borderRadius: 1.5 } }}
            />
            <TextField
              label='Author'
              placeholder='Enter author name'
              variant='outlined'
              fullWidth
              required
              inputRef={authorInputRef}
              sx={{ '& .MuiInputBase-root': { borderRadius: 1.5 } }}
            />
            <TextField
              label='Description'
              placeholder='Enter book description (max 1000 characters)'
              variant='outlined'
              multiline
              rows={4}
              fullWidth
              required
              inputRef={descriptionInputRef}
              onChange={handleDescriptionChange}
              error={descLength > 1000}
              helperText={`${descLength}/1000 characters${
                descLength > 1000 ? ' (exceeds limit)' : ''
              }`}
              sx={{ '& .MuiInputBase-root': { borderRadius: 1.5 } }}
            />
            <TextField
              label='Image URL'
              placeholder='Enter image URL'
              variant='outlined'
              fullWidth
              required
              inputRef={imageUrlInputRef}
              sx={{ '& .MuiInputBase-root': { borderRadius: 1.5 } }}
            />

            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
              <TextField
                label='Number of pages'
                placeholder='Enter number of pages'
                variant='outlined'
                fullWidth
                required
                type='number'
                inputProps={{ min: 1 }}
                inputRef={pagesInputRef}
                sx={{ '& .MuiInputBase-root': { borderRadius: 1.5 } }}
              />
              <TextField
                label='Rating'
                placeholder='Rate between 0 - 10'
                variant='outlined'
                fullWidth
                required
                type='number'
                inputProps={{ min: 0, max: 10 }}
                inputRef={ratingInputRef}
                sx={{ '& .MuiInputBase-root': { borderRadius: 1.5 } }}
              />
            </Box>

            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              sx={{
                mt: 2,
                height: 50,
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Add Book
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}

export default NewBookForm

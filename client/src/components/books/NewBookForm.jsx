import { useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EditIcon from '@mui/icons-material/Edit';

const NewBookForm = ({ initialData, onSubmit }) => {
  const isEdit = !!initialData;
  const titleInputRef = useRef();
  const authorInputRef = useRef();
  const descriptionInputRef = useRef();
  const imageUrlInputRef = useRef();
  const pagesInputRef = useRef();
  const ratingInputRef = useRef();
  const [error, setError] = useState('');
  const [descLength, setDescLength] = useState(
    initialData?.description?.length || 0,
  );

  const handleSubmit = e => {
    e.preventDefault();
    setError('');

    const description = descriptionInputRef.current.value;
    if (description.length > 1000) {
      setError('Description must be 1000 characters or less');
      return;
    }

    const bookData = {
      title: titleInputRef.current.value,
      author: authorInputRef.current.value,
      description: description,
      imageUrl: imageUrlInputRef.current.value,
      pages: parseInt(pagesInputRef.current.value),
      rating: parseInt(ratingInputRef.current.value),
    };

    onSubmit(bookData).catch(err => {
      if (err.response?.status === 409) {
        setError('A book with this title already exists');
      } else {
        setError('Something went wrong. Please try again.');
      }
    });
  };

  const handleDescriptionChange = e => {
    setDescLength(e.target.value.length);
    if (e.target.value.length > 1000) {
      setError('Description must be 1000 characters or less');
    } else {
      setError('');
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 640,
        mx: 'auto',
        my: 4,
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ px: 4, py: 3.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              p: 1,
              borderRadius: 2,
              bgcolor: 'rgba(250, 200, 152, 0.2)',
              color: 'primary.dark',
            }}
          >
            {isEdit ? <EditIcon /> : <AutoStoriesIcon />}
          </Box>
          <Typography variant='body1' fontWeight={600}>
            {isEdit
              ? 'Update the book details below.'
              : 'Fill up the form to add a new book.'}
          </Typography>
        </Box>
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
              defaultValue={initialData?.title || ''}
            />
            <TextField
              label='Author'
              placeholder='Enter author name'
              variant='outlined'
              fullWidth
              required
              inputRef={authorInputRef}
              defaultValue={initialData?.author || ''}
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
              defaultValue={initialData?.description || ''}
            />
            <TextField
              label='Image URL'
              placeholder='Enter image URL'
              variant='outlined'
              fullWidth
              required
              inputRef={imageUrlInputRef}
              defaultValue={initialData?.imageUrl || ''}
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
                defaultValue={initialData?.pages || ''}
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
                defaultValue={initialData?.rating || ''}
              />
            </Box>

            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              sx={{
                mt: 1,
                height: 52,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              {isEdit ? 'Save Changes' : 'Add Book'}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewBookForm;

import { useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { baseBoxStyle } from '../../constants';

const NewBookForm = props => {
  const titleInputRef = useRef();
  const authorInputRef = useRef();
  const descriptionInputRef = useRef();
  const imageUrlInputRef = useRef();
  const numberOfPageInputRef = useRef();
  const ratingInputRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredAuthor = authorInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredImageUrl = imageUrlInputRef.current.value;
    const enteredNumberOfPage = numberOfPageInputRef.current.value;
    const enteredRating = ratingInputRef.current.value;

    const newBookData = {
      title: enteredTitle,
      author: enteredAuthor,
      description: enteredDescription,
      imageUrl: enteredImageUrl,
      numberOfPage: parseInt(enteredNumberOfPage),
      rating: parseInt(enteredRating),
    };

    props.onAddBook(newBookData);
  };

  return (
    <Box sx={baseBoxStyle}>
      <Typography gutterBottom variant='h3' align='center'>
        Add New Book
      </Typography>
      <Card sx={{ maxWidth: 450, mx: 'auto', my: 0 }}>
        <CardContent>
          <Typography gutterBottom variant='body2' component='p' sx={{ mb: 2 }}>
            Fill up the form to add a new book.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  label='Title'
                  placeholder='Enter book title'
                  variant='outlined'
                  fullWidth
                  required
                  inputRef={titleInputRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Author'
                  placeholder='Enter author name'
                  variant='outlined'
                  fullWidth
                  required
                  inputRef={authorInputRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Description'
                  placeholder='Enter book description'
                  variant='outlined'
                  multiline
                  rows={5}
                  fullWidth
                  required
                  inputRef={descriptionInputRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Image URL'
                  placeholder='Enter image URL'
                  variant='outlined'
                  fullWidth
                  required
                  inputRef={imageUrlInputRef}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Number of pages'
                  placeholder='Enter number of pages'
                  variant='outlined'
                  fullWidth
                  required
                  inputRef={numberOfPageInputRef}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  label='Rating'
                  placeholder='Rate between 0 - 10'
                  variant='outlined'
                  fullWidth
                  required
                  inputRef={ratingInputRef}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  fullWidth
                  sx={{ height: 50 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewBookForm;

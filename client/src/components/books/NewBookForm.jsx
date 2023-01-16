import { useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const NewBookForm = props => {
  const titleInputRef = useRef();
  const authorInputRef = useRef();
  const descriptionInputRef = useRef();
  const imageUrlInputRef = useRef();
  const pagesInputRef = useRef();
  const ratingInputRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();

    const newBookData = {
      title: titleInputRef.current.value,
      author: authorInputRef.current.value,
      description: descriptionInputRef.current.value,
      imageUrl: imageUrlInputRef.current.value,
      pages: parseInt(pagesInputRef.current.value),
      rating: parseInt(ratingInputRef.current.value),
    };

    props.onAddBook(newBookData);
  };

  return (
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
                inputRef={pagesInputRef}
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
  );
};

export default NewBookForm;

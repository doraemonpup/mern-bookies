import { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

// Borderless filled inputs: gray wells, rounded, blue focus ring.
const formSx = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
  '& .MuiFilledInput-root': {
    bgcolor: '#F5F5F7',
    borderRadius: '12px',
    '&:before, &:after': { borderBottom: 'none' },
    '&:hover': { bgcolor: '#EFEFF3' },
    '&.Mui-focused': {
      bgcolor: '#F5F5F7',
      boxShadow: '0 0 0 2px #0071E3',
    },
  },
  '& .MuiInputBase-input': { fontSize: '1.0625rem' },
  '& .MuiFormLabel-root': {
    fontSize: '0.9375rem',
    color: 'text.secondary',
    '&.Mui-focused': { color: 'primary.main' },
  },
};

const PreviewPanel = ({ title, author, imageUrl, rating }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const showCover = imageUrl && !imgFailed;

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 300 },
        flexShrink: 0,
        alignSelf: { xs: 'stretch', sm: 'flex-start' },
        position: { sm: 'sticky' },
        top: { sm: 80 },
      }}
    >
      <Box
        sx={{
          bgcolor: '#F5F5F7',
          borderRadius: '12px',
          p: 3,
          minHeight: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {showCover ? (
          <Box
            component='img'
            src={imageUrl}
            alt='Cover preview'
            onError={() => setImgFailed(true)}
            onLoad={() => setImgFailed(false)}
            sx={{
              height: { xs: 300, sm: 340 },
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            }}
          />
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <AutoStoriesOutlinedIcon sx={{ fontSize: 56, color: '#C0C4C8' }} />
            <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
              Cover preview
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ px: 0.5, pt: 2, textAlign: { xs: 'center', sm: 'left' } }}>
        <Typography sx={{ fontWeight: 600, fontSize: '1.15rem', letterSpacing: '-0.01em' }}>
          {title || 'Untitled'}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mt: 0.25 }}>
          by {author || 'unknown author'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mt: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
          <Rating
            value={rating}
            readOnly
            max={10}
            precision={1}
            size='small'
          />
          <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
            {rating} / 10
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const NewBookForm = ({ initialData, onSubmit }) => {
  const isEdit = !!initialData;
  const descriptionInputRef = useRef();
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [pages, setPages] = useState(initialData?.pages || '');
  const [rating, setRating] = useState(initialData?.rating ?? 5);
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
      title: title,
      author: author,
      description: description,
      imageUrl: imageUrl,
      pages: parseInt(pages),
      rating: rating,
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
    <Box
      sx={{
        maxWidth: 980,
        mx: 'auto',
        my: 4,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 4, sm: 5 },
      }}
    >
      <PreviewPanel title={title} author={author} imageUrl={imageUrl} rating={rating} />

      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{ ...formSx, flexGrow: 1, minWidth: 0 }}
      >
        {error && (
          <Alert severity='error' sx={{ mb: 1 }}>
            {error}
          </Alert>
        )}

        <TextField
          label='Title'
          placeholder='Enter book title'
          variant='filled'
          fullWidth
          required
          slotProps={{ input: { disableUnderline: true } }}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            label='Author'
            placeholder='Enter author name'
            variant='filled'
            fullWidth
            required
            slotProps={{ input: { disableUnderline: true } }}
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
          <TextField
            label='Number of pages'
            placeholder='Enter number of pages'
            variant='filled'
            fullWidth
            required
            type='number'
            slotProps={{
              input: { disableUnderline: true },
              htmlInput: { min: 1 },
            }}
            value={pages}
            onChange={e => setPages(e.target.value)}
          />
        </Box>

        <TextField
          label='Description'
          placeholder='Enter book description (max 1000 characters)'
          variant='filled'
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
          slotProps={{ input: { disableUnderline: true } }}
          defaultValue={initialData?.description || ''}
        />

        <TextField
          label='Image URL'
          placeholder='Paste a cover image URL'
          variant='filled'
          fullWidth
          required
          slotProps={{ input: { disableUnderline: true } }}
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />

        <Box
          sx={{
            bgcolor: '#F5F5F7',
            borderRadius: '12px',
            px: 2.5,
            py: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              mb: 0.75,
            }}
          >
            <Typography variant='body2' color='text.secondary'>
              Rating
            </Typography>
            <Typography
              variant='body2'
              sx={{ fontWeight: 600, color: 'primary.main' }}
            >
              {rating} / 10
            </Typography>
          </Box>
          <Rating
            value={rating}
            onChange={(e, value) => {
              if (value !== null) setRating(value)
            }}
            max={10}
            precision={1}
            size='large'
            aria-label='Rating'
          />
        </Box>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          sx={{ mt: 1, height: 48, fontSize: '1rem' }}
        >
          {isEdit ? 'Save changes' : 'Add book'}
        </Button>
      </Box>
    </Box>
  );
};

export default NewBookForm;

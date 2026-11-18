import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import BookmarkButton from './BookmarkButton'
import RatingBadge from './RatingBadge'

const BookRow = ({ data, handleDelete, onToggleFavorite }) => {
  const navigate = useNavigate()
  const { id, title, author, imageUrl, rating, pages, favorite } = data

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        py: 1.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        component='img'
        src={imageUrl}
        alt={title}
        sx={{
          width: 56,
          height: 80,
          objectFit: 'contain',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
          flexShrink: 0,
        }}
      />

      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Typography variant='h5' component='h3' sx={{ mb: 0.25 }}>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary' noWrap>
          by {author}
          {pages ? `, ${pages} pages` : ''}
        </Typography>
      </Box>

      <Box
        sx={{ display: { xs: 'none', sm: 'block' }, flexShrink: 0 }}
      >
        <RatingBadge rating={rating} variant='plain' />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <BookmarkButton id={id} initial={favorite} onChange={() => onToggleFavorite?.()} />
        <IconButton
          aria-label={`Edit ${title}`}
          onClick={() => navigate(`/edit-book/${id}`)}
          sx={{ color: 'text.disabled', '&:hover': { color: 'primary.main' } }}
        >
          <EditOutlinedIcon fontSize='small' />
        </IconButton>
        <IconButton
          aria-label={`Delete ${title}`}
          onClick={() => handleDelete(id)}
          sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}
        >
          <DeleteOutlinedIcon fontSize='small' />
        </IconButton>
      </Box>
    </Box>
  )
}

export default BookRow

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import BookmarkButton from './BookmarkButton'
import RatingBadge from './RatingBadge'
import BookDetailDialog from './BookDetailDialog'

const BookCard = ({ data, handleDelete, onToggleFavorite }) => {
  const navigate = useNavigate()
  const [showDetail, setShowDetail] = useState(false)
  const { id, title, author, imageUrl, description, rating, favorite } = data

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transition: 'box-shadow 0.2s ease',
          '&:hover': { boxShadow: '0 8px 28px rgba(0, 0, 0, 0.12)' },
        }}
      >
        <Box
          sx={{
            bgcolor: '#F5F5F7',
            borderRadius: '18px 18px 0 0',
            display: 'flex',
            justifyContent: 'center',
            px: 4,
            py: 4,
            position: 'relative',
            cursor: 'pointer',
          }}
          onClick={() => setShowDetail(true)}
        >
          <Box
            component='img'
            src={imageUrl}
            alt={title}
            sx={{
              height: 260,
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
            }}
          />
          <RatingBadge rating={rating} />
        </Box>

        <CardContent sx={{ px: 2.5, pt: 2, pb: 0, flexGrow: 1 }}>
          <Typography
            variant='h5'
            component='h3'
            onClick={() => setShowDetail(true)}
            sx={{ cursor: 'pointer', mb: 0.25 }}
          >
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            by {author}
          </Typography>
          {description && (
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                mt: 1,
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
            >
              {description}
            </Typography>
          )}
        </CardContent>

        <Box
          sx={{
            px: 1.5,
            py: 0.75,
            mt: 1.5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <BookmarkButton id={id} initial={favorite} onChange={() => onToggleFavorite?.()} />
          <Box sx={{ flexGrow: 1 }} />
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
      </Card>

      <BookDetailDialog
        open={showDetail}
        onClose={() => setShowDetail(false)}
        data={data}
        handleDelete={handleDelete}
        onToggleFavorite={onToggleFavorite}
      />
    </>
  )
}

export default BookCard

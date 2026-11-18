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
import BookDetailDialog from './BookDetailDialog'

/**
 * Cover-dominant tile for the Favorites gallery: no description,
 * actions float in on hover (always visible on touch devices).
 */
const GalleryCard = ({ data, handleDelete, onToggleFavorite }) => {
  const navigate = useNavigate()
  const [showDetail, setShowDetail] = useState(false)
  const { id, title, author, imageUrl, rating, favorite } = data

  const floatingSx = {
    bgcolor: '#FFFFFF',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.15)',
    color: 'text.secondary',
  }

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover .fav-actions': { opacity: 1 },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            bgcolor: '#F5F5F7',
            borderRadius: '18px 18px 0 0',
            px: 3,
            py: 4,
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setShowDetail(true)}
        >
          <Box
            component='img'
            src={imageUrl}
            alt={title}
            sx={{
              height: 300,
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.14)',
            }}
          />

          <Box
            className='fav-actions'
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              opacity: 0,
              transition: 'opacity 0.15s ease',
              '@media (hover: none)': { opacity: 1 },
            }}
          >
            <Box sx={{ bgcolor: '#FFFFFF', borderRadius: '50%', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.15)' }}>
              <BookmarkButton id={id} initial={favorite} onChange={() => onToggleFavorite?.()} />
            </Box>
            <IconButton
              aria-label={`Edit ${title}`}
              onClick={() => navigate(`/edit-book/${id}`)}
              size='small'
              sx={{ ...floatingSx, '&:hover': { ...floatingSx, color: 'primary.main' } }}
            >
              <EditOutlinedIcon fontSize='small' />
            </IconButton>
            <IconButton
              aria-label={`Delete ${title}`}
              onClick={() => handleDelete(id)}
              size='small'
              sx={{ ...floatingSx, '&:hover': { ...floatingSx, color: 'error.main' } }}
            >
              <DeleteOutlinedIcon fontSize='small' />
            </IconButton>
          </Box>
        </Box>

        <CardContent sx={{ px: 2, pt: 2, pb: 1.5, flexGrow: 1, textAlign: 'center' }}>
          <Typography variant='h5' component='h3' sx={{ mb: 0.25 }}>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            by {author}
          </Typography>
          {rating !== null && rating !== undefined && (
            <Typography variant='body2' color='text.secondary' sx={{ mt: 0.75, fontWeight: 600 }}>
              {rating} / 10
            </Typography>
          )}
        </CardContent>
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

export default GalleryCard

import { Link } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import CloseIcon from '@mui/icons-material/Close'
import BookmarkButton from './BookmarkButton'
import RatingBadge from './RatingBadge'

/**
 * Apple product-page style dialog: cover on a gray well, big title,
 * specs line, description, pill actions.
 */
const BookDetailDialog = ({ open, onClose, data, handleDelete, onToggleFavorite }) => {
  const { id, title, author, imageUrl, description, rating, pages, favorite } = data

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <IconButton
        aria-label='Close details'
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          color: 'text.secondary',
          bgcolor: 'rgba(245, 245, 247, 0.9)',
          '&:hover': { bgcolor: '#E8E8ED' },
        }}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2.5, sm: 4 },
            p: { xs: 2, sm: 4 },
            maxHeight: { xs: 'calc(100vh - 120px)', sm: '72vh' },
            overflowY: 'auto',
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                bgcolor: '#F5F5F7',
                borderRadius: '12px',
                p: { xs: 2, sm: 3 },
                display: 'flex',
                justifyContent: 'center',
                width: { xs: '100%', sm: 300 },
              }}
            >
              <Box
                component='img'
                src={imageUrl}
                alt={title}
                sx={{
                  height: { xs: 280, sm: 380 },
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                }}
              />
            </Box>
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant='h2'
              component='h2'
              sx={{ fontSize: { xs: '1.75rem', sm: '2rem' }, mb: 0.5 }}
            >
              {title}
            </Typography>
            <Typography color='text.secondary' sx={{ mb: 2 }}>
              by {author}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
              <RatingBadge rating={rating} variant='plain' />
              {pages && (
                <Typography variant='body2' color='text.secondary'>
                  {pages} pages
                </Typography>
              )}
            </Box>

            {description && (
              <Typography
                color='text.secondary'
                sx={{ maxWidth: '55ch', mb: 3, lineHeight: 1.6 }}
              >
                {description}
              </Typography>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
              <BookmarkButton id={id} initial={favorite} onChange={() => onToggleFavorite?.()} />
              <Button
                component={Link}
                to={`/edit-book/${id}`}
                variant='contained'
                size='small'
                startIcon={<EditOutlinedIcon />}
              >
                Edit
              </Button>
              <Button
                size='small'
                startIcon={<DeleteOutlinedIcon />}
                onClick={() => {
                  onClose()
                  handleDelete(id)
                }}
                sx={{
                  bgcolor: '#F5F5F7',
                  color: 'text.primary',
                  '&:hover': { bgcolor: '#E8E8ED', color: 'error.main' },
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default BookDetailDialog

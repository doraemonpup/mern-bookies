import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import CloseIcon from '@mui/icons-material/Close'
import { Rating } from '@mui/material'
import { Button } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { toggleFavorite as toggleFavApi } from '../../helpers/favorites'

const BookCard = ({
  data: { id, title, author, imageUrl, description, rating, favorite },
  handleDelete,
  onToggleFavorite,
}) => {
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(favorite || false)
  const [showPreview, setShowPreview] = useState(false)

  return (
    <>
      <Card
        sx={{
          width: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 12px 40px rgba(250, 200, 152, 0.3)',
          },
        }}
      >
      <Box
        sx={{ position: 'relative', cursor: 'pointer' }}
        onClick={() => setShowPreview(true)}
      >
        <CardMedia
          component='img'
          height={300}
          image={imageUrl}
          alt={title}
          sx={{
            objectFit: 'contain',
            bgcolor: 'rgba(250, 200, 152, 0.08)',
            p: 2,
            transition: 'all 0.3s ease-in-out',
          }}
        />
        <Chip
          icon={<StarIcon sx={{ fontSize: 16 }} />}
          label={`${rating}/10`}
          size='small'
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: 'primary.dark',
            fontWeight: 700,
            fontSize: '0.8rem',
            '& .MuiChip-icon': { color: 'primary.dark' },
          }}
        />
      </Box>
      <CardContent sx={{ px: 3, pt: 2.5, pb: 1 }}>
        <Typography
          variant='h5'
          fontWeight={700}
          sx={{ mb: 0.5, color: 'text.primary', lineHeight: 1.3 }}
        >
          {title}
        </Typography>
        <Typography
          variant='subtitle1'
          color='text.secondary'
          fontStyle='italic'
          sx={{ mb: 1.5 }}
        >
          by {author}
        </Typography>
        <Rating
          value={rating / 2}
          readOnly
          precision={0.5}
          size='small'
          sx={{ mb: 1.5 }}
        />
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            lineHeight: 1.7,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: isExpanded ? 'unset' : 4,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {description}
        </Typography>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          endIcon={
            isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
          sx={{
            textTransform: 'none',
            color: 'primary.main',
            p: 0,
            minWidth: 'unset',
            mt: 0.5,
            '&:hover': { background: 'none', color: 'primary.dark' },
          }}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </Button>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          px: 3,
          py: 1.5,
          borderTop: '1px solid rgba(255, 255, 255, 0.5)',
        }}
      >
        <IconButton
          aria-label='add to favorites'
          onClick={async () => {
            const updated = await toggleFavApi(id)
            setIsFavorite(updated.favorite)
            onToggleFavorite?.()
          }}
          sx={{
            color: isFavorite ? 'secondary.main' : 'action.disabled',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              color: 'secondary.main',
              transform: 'scale(1.1)',
            },
          }}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label='edit'
          onClick={() => navigate(`/edit-book/${id}`)}
          sx={{
            color: 'action.disabled',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              color: 'primary.main',
              transform: 'scale(1.1)',
            },
          }}
        >
          <EditIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          aria-label='delete'
          onClick={() => handleDelete(id)}
          sx={{
            color: 'action.disabled',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              color: 'error.main',
              transform: 'scale(1.1)',
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth='md'
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            position: 'relative',
            overflow: 'hidden',
            maxWidth: 920,
          },
        }}
      >
        <IconButton
          onClick={() => setShowPreview(false)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            bgcolor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            width: 880,
            height: 660,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(250, 200, 152, 0.06)',
            px: 4,
            py: 6,
          }}
        >
          <Box
            component='img'
            src={imageUrl}
            alt={title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: 2,
            }}
          />
        </Box>
      </Dialog>
    </>
  )
}

export default BookCard

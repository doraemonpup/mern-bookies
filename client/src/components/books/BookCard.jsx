import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import { Rating } from '@mui/material'
import { useState } from 'react'
import { Button } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const BookCard = ({
  data: { id, title, author, imageUrl, description, rating },
  handleDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 350,
        height: '100%',
        maxHeight: 600,
        borderRadius: 2,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 8,
        },
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        mx: 'auto',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component='img'
          height='320'
          alt={title}
          image={imageUrl}
          sx={{
            objectFit: 'contain',
            transition: 'all 0.3s ease-in-out',
            filter: isHovered ? 'brightness(0.85)' : 'brightness(1)',
            borderRadius: '8px 8px 0 0',
            height: 320,
            bgcolor: '#f8f9fa',
            p: 2,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            p: 1,
            borderRadius: '0 8px 0 8px',
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Typography
            variant='body2'
            sx={{
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 'bold',
            }}
          >
            {rating}/10
          </Typography>
          <Rating
            value={rating / 2}
            readOnly
            precision={0.5}
            size='small'
            sx={{ color: 'warning.light', ml: 0.5 }}
          />
        </Box>
        <CardHeader
          title={
            <Typography
              variant='h6'
              sx={{
                fontWeight: 600,
                fontSize: '1.1rem',
                lineHeight: 1.2,
                mb: 0.5,
                color: 'text.primary',
              }}
            >
              {title}
            </Typography>
          }
          subheader={
            <Typography
              variant='subtitle2'
              sx={{
                color: 'text.secondary',
                fontStyle: 'italic',
              }}
            >
              by {author}
            </Typography>
          }
          sx={{ pb: 1 }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            pt: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: isExpanded ? 'unset' : 3,
              textAlign: 'justify',
              lineHeight: 1.5,
              mb: isExpanded ? 2 : 0,
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
              display: 'flex',
              alignItems: 'center',
              mt: 1,
              alignSelf: 'flex-start',
              '&:hover': {
                background: 'none',
                color: 'primary.dark',
              },
            }}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        </CardContent>
      </Box>

      <CardActions
        disableSpacing
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          px: 2,
          py: 1,
          height: 56,
          minHeight: 56,
          mt: 'auto',
        }}
      >
        <IconButton
          aria-label='add to favorites'
          onClick={() => setIsFavorite(!isFavorite)}
          sx={{
            color: isFavorite ? 'error.main' : 'action.disabled',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              color: 'error.main',
              transform: 'scale(1.1)',
            },
          }}
        >
          <FavoriteIcon />
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
  )
}

export default BookCard

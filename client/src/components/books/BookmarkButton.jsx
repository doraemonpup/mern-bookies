import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { toggleFavorite as toggleFavApi } from '../../helpers/favorites'

const BookmarkButton = ({ id, initial = false, onChange }) => {
  const [isFavorite, setIsFavorite] = useState(initial)

  return (
    <IconButton
      aria-label={isFavorite ? 'Remove bookmark' : 'Save book'}
      aria-pressed={isFavorite}
      onClick={async () => {
        const updated = await toggleFavApi(id)
        setIsFavorite(updated.favorite)
        onChange?.(updated)
      }}
      sx={{
        color: isFavorite ? 'primary.main' : 'text.secondary',
        transition: 'color 0.15s ease',
        '&:hover': { color: isFavorite ? 'primary.dark' : 'primary.main' },
      }}
    >
      {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
    </IconButton>
  )
}

export default BookmarkButton

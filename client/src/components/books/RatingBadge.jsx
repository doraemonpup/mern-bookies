import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

/**
 * Rating shown as a quiet pill, e.g. "8 / 10".
 * variant 'badge' floats over the cover; 'plain' sits inline in rows and dialogs.
 */
const RatingBadge = ({ rating, variant = 'badge' }) => {
  if (rating === null || rating === undefined) return null

  const value = (
    <>
      {rating}
      <Box component='span' sx={{ color: 'text.secondary', fontWeight: 400 }}>
        {' '}
        / 10
      </Box>
    </>
  )

  if (variant === 'plain') {
    return (
      <Typography
        variant='body2'
        sx={{ fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}
      >
        {value}
      </Typography>
    )
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        px: 1.25,
        py: 0.25,
        bgcolor: '#FFFFFF',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.12)',
        borderRadius: '980px',
        fontSize: '0.75rem',
        fontWeight: 600,
        lineHeight: 1.6,
        whiteSpace: 'nowrap',
      }}
    >
      {value}
    </Box>
  )
}

export default RatingBadge

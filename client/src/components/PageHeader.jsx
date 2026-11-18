import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

/**
 * Apple-style centered hero: big semibold headline ending in a period,
 * optional gray subline, optional action.
 */
const PageHeader = ({ title, subtitle, action }) => (
  <Box
    sx={{
      textAlign: 'center',
      pt: { xs: 4, md: 8 },
      pb: { xs: 4, md: 6 },
    }}
  >
    <Typography
      variant='h1'
      sx={{ fontSize: { xs: '2.25rem', md: '3.5rem' }, mb: subtitle ? 1 : 0 }}
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography
        color='text.secondary'
        sx={{ fontSize: { xs: '1.05rem', md: '1.25rem' }, maxWidth: 520, mx: 'auto' }}
      >
        {subtitle}
      </Typography>
    )}
    {action}
  </Box>
)

export default PageHeader

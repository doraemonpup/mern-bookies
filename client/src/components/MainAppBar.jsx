import { useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { pages } from '../constants'

const MainAppBar = () => {
  const location = useLocation()

  return (
    <AppBar
      position='static'
      sx={{
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 2px 20px rgba(250, 200, 152, 0.2)',
      }}
    >
      <Toolbar disableGutters sx={{ px: 3, minHeight: 64 }}>
        <IconButton
          size='large'
          aria-label='home'
          href='/'
          sx={{
            color: 'primary.dark',
            '&:hover': { bgcolor: 'rgba(250, 200, 152, 0.15)' },
          }}
        >
          <MenuBookIcon />
        </IconButton>
        <Typography
          variant='h5'
          noWrap
          component='a'
          href='/'
          sx={{
            ml: 0.5,
            mr: 4,
            display: { xs: 'none', sm: 'flex' },
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 700,
            color: 'text.primary',
            textDecoration: 'none',
          }}
        >
          Bookies
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {pages.map(page => {
            const isActive = location.pathname === page.path
            return (
              <Button
                key={page.title}
                href={page.path}
                sx={{
                  textTransform: 'none',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.95rem',
                  px: 2,
                  color: isActive ? 'primary.dark' : 'text.secondary',
                  bgcolor: isActive ? 'rgba(250, 200, 152, 0.15)' : 'transparent',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'rgba(250, 200, 152, 0.15)',
                    color: 'primary.dark',
                  },
                }}
              >
                {page.title}
              </Button>
            )
          })}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default MainAppBar

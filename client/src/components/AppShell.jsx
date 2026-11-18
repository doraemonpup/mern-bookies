import { Outlet, Link, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { pages } from '../constants'

const navIcons = {
  '/': <MenuBookOutlinedIcon />,
  '/new-book': <NoteAddOutlinedIcon />,
  '/favorites': <BookmarkBorderOutlinedIcon />,
  '/about': <InfoOutlinedIcon />,
}

const AppShell = () => {
  const { pathname } = useLocation()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        component='header'
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: theme => theme.zIndex.appBar,
          bgcolor: 'rgba(251, 251, 253, 0.8)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        }}
      >
        <Container maxWidth='lg'>
          <Box sx={{ display: 'flex', alignItems: 'center', height: 48 }}>
            <Box
              component={Link}
              to='/'
              sx={{
                fontWeight: 600,
                fontSize: '1.05rem',
                letterSpacing: '-0.01em',
                color: 'text.primary',
                textDecoration: 'none',
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: 2,
                },
              }}
            >
              Bookies<span sx={{ color: 'primary.main' }}>.</span>
            </Box>

            <Box
              component='nav'
              sx={{ display: 'flex', gap: { xs: 0.25, sm: 1.5 }, ml: 'auto' }}
            >
              {pages.map(page => {
                const isActive = pathname === page.path
                return (
                  <Box
                    key={page.path}
                    component={Link}
                    to={page.path}
                    aria-current={isActive ? 'page' : undefined}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.75,
                      px: { xs: 1, sm: 1.25 },
                      py: 1,
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '0.8125rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive
                        ? 'text.primary'
                        : 'rgba(29, 29, 31, 0.72)',
                      '&:hover': { color: 'text.primary' },
                      '&:focus-visible': {
                        outline: '2px solid',
                        outlineColor: 'primary.main',
                        outlineOffset: 2,
                      },
                    }}
                  >
                    <Box
                      component='span'
                      sx={{
                        display: { xs: 'inline-flex', sm: 'none' },
                        alignItems: 'center',
                        '& svg': { fontSize: 20 },
                      }}
                    >
                      {navIcons[page.path]}
                    </Box>
                    <Box
                      component='span'
                      sx={{ display: { xs: 'none', sm: 'inline' } }}
                    >
                      {page.title}
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Box>
        </Container>
      </Box>

      <Box component='main' sx={{ flexGrow: 1 }}>
        <Container maxWidth='lg' sx={{ pt: { xs: 2, md: 3 }, pb: { xs: 6, md: 8 } }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}

export default AppShell

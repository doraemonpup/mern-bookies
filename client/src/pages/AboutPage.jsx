import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'

const Tile = ({ span = {}, tinted = false, children }) => (
  <Box
    sx={{
      borderRadius: '18px',
      p: { xs: 3, md: 4 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: 1.5,
      ...(tinted
        ? { bgcolor: '#F5F5F7' }
        : { border: '1px solid #D2D2D7' }),
      gridColumn: span.col,
      gridRow: span.row,
    }}
  >
    {children}
  </Box>
)

const TileTitle = ({ title, caption }) => (
  <>
    <Typography sx={{ fontWeight: 600, fontSize: '1.05rem' }}>{title}</Typography>
    <Typography variant='body2' color='text.secondary'>
      {caption}
    </Typography>
  </>
)

const CoverFan = () => {
  const tones = ['#1D1D1F', '#0071E3', '#86868B']
  const rotations = [-8, 0, 8]

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 150, md: 180 },
        width: { xs: 200, md: 240 },
        my: 1,
      }}
    >
      {tones.map((tone, i) => (
        <Box
          key={tone}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: { xs: 88, md: 108 },
            height: { xs: 126, md: 156 },
            borderRadius: '8px',
            bgcolor: tone,
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.18)',
            transform: `translate(-50%, -50%) rotate(${rotations[i]}deg) translateX(${(i - 1) * 34}px)`,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              width: 3,
              bottom: 10,
              borderRadius: '2px',
              bgcolor: 'rgba(255, 255, 255, 0.35)',
            }}
          />
        </Box>
      ))}
    </Box>
  )
}

const StarRow = () => (
  <Box sx={{ display: 'flex', gap: 0.5 }}>
    {Array.from({ length: 10 }).map((_, i) => (
      <StarRoundedIcon
        key={i}
        sx={{ fontSize: 24, color: i < 9 ? 'primary.main' : '#E8E8ED' }}
      />
    ))}
  </Box>
)

const AboutPage = () => {
  return (
    <Box>
      <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 } }}>
        <Typography
          variant='h1'
          sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, mb: 1.5 }}
        >
          About Bookies.
        </Typography>
        <Typography
          color='text.secondary'
          sx={{ fontSize: { xs: '1.05rem', md: '1.3rem' }, maxWidth: 560, mx: 'auto' }}
        >
          A quiet home for the books you read and love.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2.5, md: 3 } }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant='h2'
            component='h2'
            sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Built for readers.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 2,
            pb: { xs: 6, md: 10 },
          }}
        >
          <Tile
            tinted
            span={{ col: { xs: 'auto', sm: 'span 2', md: 'span 2' }, row: { xs: 'auto', sm: 'auto', md: 'span 2' } }}
          >
            <CoverFan />
            <TileTitle title='Covers first.' caption='Your library, the way books look on a shelf.' />
          </Tile>

          <Tile>
            <StarRow />
            <TileTitle title='Rate 1–10.' caption='Ten points of honest opinion.' />
          </Tile>

          <Tile>
            <BookmarkRoundedIcon sx={{ fontSize: 56, color: 'primary.main' }} />
            <TileTitle title='Save it.' caption='Bookmark the keepers.' />
          </Tile>

          <Tile span={{ col: { xs: 'auto', sm: 'span 2', md: 'span 2' } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                bgcolor: '#F5F5F7',
                borderRadius: '12px',
                px: 2.5,
                py: 1.5,
                width: '100%',
                maxWidth: 380,
              }}
            >
              <SearchRoundedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Typography variant='body2' color='text.secondary'>
                Search by title or author
              </Typography>
            </Box>
            <TileTitle title='Find fast.' caption='Any book, in seconds.' />
          </Tile>

          <Tile span={{ col: { xs: 'auto', sm: 'span 2', md: 'span 4' } }}>
            <Box
              sx={{
                display: 'inline-flex',
                bgcolor: '#F5F5F7',
                borderRadius: '9px',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  px: 2.5,
                  py: 1.25,
                  bgcolor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
                }}
              >
                <GridViewIcon sx={{ fontSize: 18 }} />
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Grid</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 2.5, py: 1.25 }}>
                <ViewListIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>List</Typography>
              </Box>
            </Box>
            <TileTitle title='Your layout, your call.' caption='Browse by eye or scan by list.' />
          </Tile>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100vw',
          ml: 'calc(50% - 50vw)',
          bgcolor: '#F5F5F7',
        }}
      >
        <Box sx={{ maxWidth: 720, mx: 'auto', px: 3, py: { xs: 7, md: 10 }, textAlign: 'center' }}>
          <Typography
            variant='h2'
            component='h2'
            sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}
          >
            Our story.
          </Typography>
          <Typography
            color='text.secondary'
            sx={{ fontSize: '1.0625rem', lineHeight: 1.6, mb: 2 }}
          >
            Bookies was born from a simple idea: sharing the joy of reading.
            What started as a small collection of personal favorites has grown
            into a community of book lovers who believe every story deserves
            to be discovered.
          </Typography>
          <Typography color='text.secondary' sx={{ fontSize: '1.0625rem', lineHeight: 1.6 }}>
            We carefully curate each title, from timeless classics to hidden
            gems, so you can always find something that speaks to you.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', py: { xs: 7, md: 10 } }}>
        <Typography
          variant='h2'
          component='h2'
          sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 3 }}
        >
          Start your library today.
        </Typography>
        <Button component={Link} to='/new-book' variant='contained' size='large'>
          Add a book
        </Button>
      </Box>
    </Box>
  )
}

export default AboutPage

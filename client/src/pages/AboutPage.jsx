import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import FavoriteIcon from '@mui/icons-material/Favorite'
import GroupsIcon from '@mui/icons-material/Groups'

const SectionCard = ({ icon, title, children }) => (
  <Card
    sx={{
      background: 'rgba(255, 255, 255, 0.65)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: 3,
      p: 0.5,
    }}
  >
    <CardContent sx={{ px: 3.5, py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            p: 1,
            borderRadius: 2,
            bgcolor: 'rgba(250, 200, 152, 0.2)',
            color: 'primary.dark',
          }}
        >
          {icon}
        </Box>
        <Typography variant='h6' fontWeight={700}>
          {title}
        </Typography>
      </Box>
      {children}
    </CardContent>
  </Card>
)

const AboutPage = () => {
  return (
    <Box sx={{ width: '80%', maxWidth: 900, mx: 'auto', my: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Box
          sx={{
            display: 'inline-flex',
            p: 1.5,
            borderRadius: 3,
            bgcolor: 'rgba(250, 200, 152, 0.2)',
            color: 'primary.dark',
            mb: 2,
          }}
        >
          <MenuBookIcon sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant='h3' fontWeight={700} sx={{ mb: 1 }}>
          About Us
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.1rem' }}
        >
          Your cozy corner for discovering and organizing the books you love.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <SectionCard
          icon={<FavoriteIcon />}
          title='Our Story'
        >
          <Typography variant='body2' color='text.secondary' sx={{ lineHeight: 1.8, mb: 2 }}>
            Bookies was born from a simple idea: sharing the joy of reading.
            What started as a small collection of personal favorites has grown
            into a warm community of book lovers who believe every story deserves
            to be discovered.
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ lineHeight: 1.8 }}>
            We carefully curate each title, from timeless classics to hidden
            gems, so you can always find something that speaks to you.
          </Typography>
        </SectionCard>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <SectionCard
            icon={<GroupsIcon />}
            title='What We Offer'
          >
            <Typography variant='body2' color='text.secondary' sx={{ lineHeight: 1.8 }}>
              A beautifully simple way to browse, save, and organize your
              favorite books. Whether you are tracking your reading journey or
              discovering your next great read, Bookies is here for you.
            </Typography>
          </SectionCard>

          <SectionCard
            icon={<MenuBookIcon />}
            title='Why Bookies'
          >
            <Typography variant='body2' color='text.secondary' sx={{ lineHeight: 1.8 }}>
              We believe books are more than words on a page — they are
              adventures waiting to happen. Bookies is designed to make every
              interaction with your library feel as warm and inviting as
              curling up with a good book.
            </Typography>
          </SectionCard>
        </Box>
      </Box>
    </Box>
  )
}

export default AboutPage

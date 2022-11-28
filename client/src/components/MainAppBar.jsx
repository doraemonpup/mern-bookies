import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { pages } from '../constants';

const MainAppBar = () => {
  return (
    <AppBar position='static' sx={{ minWidth: '600px' }}>
      <Toolbar disableGutters>
        <IconButton size='large' color='inherit' aria-label='icon' href='/'>
          <MenuBookIcon />
        </IconButton>
        <Typography
          variant='h5'
          noWrap
          component='a'
          href='/'
          sx={{
            mr: 2,
            display: {
              xs: 'none',
              sm: 'flex',
            },
            fontFamily: 'monospace',
            fontWeight: 500,
            letterSpacing: '.2rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Bookies
        </Typography>
        {pages.map(page => (
          <Button
            key={page.title}
            href={page.link}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            {page.title}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;

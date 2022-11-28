import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red, yellow, green, purple } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

const BookCard = ({
  data: { title, author, imageUrl, description, rating },
}) => {
  return (
    <Card sx={{ maxWidth: 450, mt: 4, mb: 4, ml: 3, mr: 3 }}>
      <CardHeader title={title} subheader={`by ${author}`} />
      <CardMedia component='img' height='300' alt={title} image={imageUrl} />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton aria-label='delete'>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BookCard;

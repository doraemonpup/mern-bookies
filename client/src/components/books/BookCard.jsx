import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

const BookCard = ({
  data: { id, title, author, imageUrl, description, rating },
  handleDelete,
}) => {
  return (
    <Card sx={{ maxWidth: 400, mx: 3, my: 4 }}>
      <CardHeader title={title} subheader={`by ${author}`} />
      <CardMedia component='img' height='500' alt={title} image={imageUrl} />
      <CardContent>
        <Typography variant='body1' color='text.secondary' align='justify'>
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton id={id} aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton id={id} aria-label='delete' onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BookCard;

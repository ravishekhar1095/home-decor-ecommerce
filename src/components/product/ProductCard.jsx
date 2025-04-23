import { Card, CardMedia, CardContent, CardActions, Typography, Button, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.shortDescription || product.description?.substring(0, 100) + '...'}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <IconButton aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>
        <Button 
          size="small" 
          color="primary"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
        <Button 
          size="small" 
          component={Link} 
          to={`/products/${product._id || product.id}`}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

import { Container, Grid, Typography, Box } from '@mui/material';
import ProductCard from '../components/product/ProductCard';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';

const HomePage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Modern Ceramic Vase',
      price: 45.99,
      image: '/images/vase.jpg',
      shortDescription: 'Handcrafted ceramic vase with minimalist design',
      category: 'decor'
    },
    {
      id: 2,
      name: 'Wooden Coffee Table',
      price: 249.99,
      image: '/images/coffee-table.jpg',
      shortDescription: 'Solid oak coffee table with clean lines',
      category: 'furniture'
    },
    {
      id: 3,
      name: 'Linen Throw Blanket',
      price: 79.99,
      image: '/images/blanket.jpg',
      shortDescription: 'Soft linen blanket in neutral tones',
      category: 'textiles'
    },
    {
      id: 5,
      name: 'Industrial Floor Lamp',
      price: 129.99,
      image: '/images/lamp.jpg',
      shortDescription: 'Adjustable floor lamp with metal finish',
      category: 'lighting'
    },
    {
      id: 6,
      name: 'Industrial Floor Lamp',
      price: 129.99,
      image: '/images/lamp.jpg',
      shortDescription: 'Adjustable floor lamp with metal finish',
      category: 'lighting'
    },
    {
      id: 7,
      name: 'Industrial Floor Lamp',
      price: 129.99,
      image: '/images/lamp.jpg',
      shortDescription: 'Adjustable floor lamp with metal finish',
      category: 'lighting'
    },
    {
      id: 8,
      name: 'Industrial Floor Lamp',
      price: 129.99,
      image: '/images/lamp.jpg',
      shortDescription: 'Adjustable floor lamp with metal finish',
      category: 'lighting'
    },
    {
      id: 9,
      name: 'Industrial Floor Lamp',
      price: 129.99,
      image: '/images/lamp.jpg',
      shortDescription: 'Adjustable floor lamp with metal finish',
      category: 'lighting'
    },
  ];

  return (
    <Box>
      <HeroBanner 
        title="Elevate Your Space"
        subtitle="Discover handcrafted home decor pieces"
        image="/images/hero-banner.jpg"
        ctaText="Shop Now"
        ctaLink="/category/all"
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <CategoryGrid />
    </Box>
  );
};

export default HomePage;

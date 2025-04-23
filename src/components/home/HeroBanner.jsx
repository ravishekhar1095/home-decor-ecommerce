import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HeroBanner = ({ title, subtitle, image, ctaText, ctaLink }) => {
  return (
    <Box sx={{ 
      position: 'relative',
      height: '500px',
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }
    }}>
      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '800px', px: 3 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
          {subtitle}
        </Typography>
        <Button 
          component={Link} 
          to={ctaLink} 
          variant="contained" 
          size="large"
          sx={{ 
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.dark' }
          }}
        >
          {ctaText}
        </Button>
      </Box>
    </Box>
  );
};

export default HeroBanner;

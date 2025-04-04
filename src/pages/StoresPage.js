import React from 'react';
import { Container, Typography, Box, Breadcrumbs, Link, Grid, Card, CardContent, CardMedia, Button, Rating, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NavigateNext as NavigateNextIcon, LocationOn as LocationIcon, AccessTime as TimeIcon, Phone as PhoneIcon } from '@mui/icons-material';

// Sample stores data - would come from API in real app
const storesData = [
  {
    id: 1,
    name: 'Fresh Market',
    type: 'Supermarket',
    image: 'https://via.placeholder.com/400x200',
    rating: 4.2,
    address: '123 Market Street, Andheri East, Mumbai',
    distance: '0.5 km',
    phone: '+91 98765 43210',
    hours: '8:00 AM - 10:00 PM',
    features: ['Home Delivery', 'Online Ordering', 'Fresh Produce']
  },
  {
    id: 2,
    name: 'Kirana Store',
    type: 'Local Store',
    image: 'https://via.placeholder.com/400x200',
    rating: 4.0,
    address: '45 Local Market, Bandra West, Mumbai',
    distance: '0.8 km',
    phone: '+91 98765 43211',
    hours: '7:00 AM - 9:00 PM',
    features: ['Low Prices', 'Local Items']
  },
  {
    id: 3,
    name: 'Premium Grocery',
    type: 'Supermarket',
    image: 'https://via.placeholder.com/400x200',
    rating: 4.7,
    address: '67 Shopping Center, Juhu, Mumbai',
    distance: '1.2 km',
    phone: '+91 98765 43212',
    hours: '9:00 AM - 11:00 PM',
    features: ['Imported Products', 'Home Delivery', 'Premium Quality']
  },
  {
    id: 4,
    name: 'BigBasket',
    type: 'Online Store',
    image: 'https://via.placeholder.com/400x200',
    rating: 4.5,
    address: 'Online Only',
    distance: 'Online',
    phone: '+91 98765 43213',
    hours: '24/7 Online',
    features: ['Fast Delivery', 'Wide Selection', 'Discounts']
  },
  {
    id: 5,
    name: 'Neighborhood Market',
    type: 'Local Store',
    image: 'https://via.placeholder.com/400x200',
    rating: 3.9,
    address: '89 Local Street, Powai, Mumbai',
    distance: '1.5 km',
    phone: '+91 98765 43214',
    hours: '7:30 AM - 9:30 PM',
    features: ['Budget Friendly', 'Local Items']
  },
  {
    id: 6,
    name: 'Organic Basket',
    type: 'Specialty Store',
    image: 'https://via.placeholder.com/400x200',
    rating: 4.6,
    address: '22 Health Avenue, Colaba, Mumbai',
    distance: '2.3 km',
    phone: '+91 98765 43215',
    hours: '9:00 AM - 8:00 PM',
    features: ['Organic Products', 'Health Foods', 'Eco Friendly']
  }
];

const StoresPage = () => {
  return (
    <Container maxWidth="lg">
      <Box my={2}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
        >
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Stores</Typography>
        </Breadcrumbs>
      </Box>

      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Nearby Stores
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Browse stores near your location and compare grocery prices.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {storesData.map((store) => (
          <Grid item xs={12} sm={6} md={4} key={store.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 2,
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                }
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={store.image}
                alt={store.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                      {store.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {store.type}
                    </Typography>
                  </Box>
                  <Box>
                    <Rating value={store.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary" align="right">
                      ({store.rating})
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {store.distance} • {store.address}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {store.hours}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, my: 2 }}>
                  {store.features.map((feature, index) => (
                    <Chip 
                      key={index} 
                      label={feature} 
                      size="small" 
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                  ))}
                </Box>
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  sx={{ mt: 2 }}
                  component={RouterLink}
                  to={`/stores/${store.id}`}
                >
                  View Store
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StoresPage; 
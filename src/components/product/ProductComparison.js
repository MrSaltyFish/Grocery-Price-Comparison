import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Divider,
  Chip,
  Paper,
  Switch,
  FormControlLabel,
  useTheme,
  useMediaQuery,
  Rating,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  DirectionsWalk,
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Sort as SortIcon,
  FilterList as FilterIcon,
  LocalOffer as CouponIcon,
  Store as StoreIcon,
  Share as ShareIcon
} from '@mui/icons-material';

// Sample data - in a real app, this would come from API
const sampleProductData = {
  name: 'Organic Milk',
  category: 'Dairy',
  image: 'https://via.placeholder.com/200',
  description: 'Fresh organic cow milk, 500ml',
  stores: [
    {
      id: 1,
      name: 'Fresh Market',
      logo: 'https://via.placeholder.com/50',
      price: 45,
      originalPrice: 50,
      discount: '10% off',
      distance: '0.5 km',
      delivery: true,
      deliveryFee: 'Free',
      availableQuantity: 20,
      type: 'Supermarket',
      rating: 4.2
    },
    {
      id: 2,
      name: 'Kirana Store',
      logo: 'https://via.placeholder.com/50',
      price: 42,
      originalPrice: 45,
      discount: '7% off',
      distance: '0.8 km',
      delivery: true,
      deliveryFee: '₹10',
      availableQuantity: 15,
      type: 'Local Store',
      rating: 4.0
    },
    {
      id: 3,
      name: 'BigBasket',
      logo: 'https://via.placeholder.com/50',
      price: 48,
      originalPrice: 48,
      discount: null,
      distance: 'Online',
      delivery: true,
      deliveryFee: '₹20',
      availableQuantity: 100,
      type: 'Online Store',
      rating: 4.5
    },
    {
      id: 4,
      name: 'Premium Grocery',
      logo: 'https://via.placeholder.com/50',
      price: 55,
      originalPrice: 60,
      discount: '₹5 off',
      distance: '1.2 km',
      delivery: false,
      availableQuantity: 30,
      type: 'Supermarket',
      rating: 4.7
    }
  ]
};

const ProductComparison = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sortBy, setSortBy] = useState('price');
  const [showOnlyDelivery, setShowOnlyDelivery] = useState(false);
  const [favoriteStores, setFavoriteStores] = useState([]);

  // Sort the stores based on selected option
  const sortedStores = [...sampleProductData.stores].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'distance') {
      if (a.distance === 'Online') return 1;
      if (b.distance === 'Online') return -1;
      return parseFloat(a.distance) - parseFloat(b.distance);
    }
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  // Filter stores based on delivery option
  const filteredStores = showOnlyDelivery 
    ? sortedStores.filter(store => store.delivery) 
    : sortedStores;

  const toggleFavorite = (storeId) => {
    if (favoriteStores.includes(storeId)) {
      setFavoriteStores(favoriteStores.filter(id => id !== storeId));
    } else {
      setFavoriteStores([...favoriteStores, storeId]);
    }
  };

  return (
    <Container>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 2,
          bgcolor: '#f5f5f5'
        }}
      >
        <Grid container spacing={isMobile ? 2 : 4} alignItems="center">
          <Grid item xs={12} sm={3}>
            <CardMedia
              component="img"
              height={isMobile ? '120' : '160'}
              image={sampleProductData.image}
              alt={sampleProductData.name}
              sx={{ objectFit: 'contain', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Chip 
                    label={sampleProductData.category} 
                    size="small" 
                    sx={{ 
                      bgcolor: '#E8F5E9', 
                      color: '#2E7D32',
                      mb: 1
                    }}
                  />
                  <Typography variant="h5" fontWeight="bold">
                    {sampleProductData.name}
                  </Typography>
                </Box>
                <Tooltip title="Share">
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="body1" color="text.secondary" paragraph>
                {sampleProductData.description}
              </Typography>
              
              <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" mr={1}>Best price:</Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    ₹{Math.min(...sampleProductData.stores.map(s => s.price))}
                  </Typography>
                </Box>
                
                <Divider orientation="vertical" flexItem sx={{ height: 20 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" mr={1}>Price range:</Typography>
                  <Typography variant="body1">
                    ₹{Math.min(...sampleProductData.stores.map(s => s.price))} - 
                    ₹{Math.max(...sampleProductData.stores.map(s => s.price))}
                  </Typography>
                </Box>
                
                <Divider orientation="vertical" flexItem sx={{ height: 20 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" mr={1}>Stores:</Typography>
                  <Typography variant="body1">
                    {sampleProductData.stores.length} stores
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          mb: 2,
          gap: 2
        }}
      >
        <Box display="flex" alignItems="center">
          <SortIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="subtitle2" mr={2}>Sort by:</Typography>
          <Box>
            <Button 
              variant={sortBy === 'price' ? 'contained' : 'outlined'}
              size="small" 
              onClick={() => setSortBy('price')}
              sx={{ mr: 1, borderRadius: 4 }}
              color="primary"
            >
              Price
            </Button>
            <Button 
              variant={sortBy === 'distance' ? 'contained' : 'outlined'}
              size="small" 
              onClick={() => setSortBy('distance')}
              sx={{ mr: 1, borderRadius: 4 }}
              color="primary"
            >
              Distance
            </Button>
            <Button 
              variant={sortBy === 'rating' ? 'contained' : 'outlined'}
              size="small" 
              onClick={() => setSortBy('rating')}
              sx={{ borderRadius: 4 }}
              color="primary"
            >
              Rating
            </Button>
          </Box>
        </Box>
        
        <FormControlLabel
          control={
            <Switch 
              checked={showOnlyDelivery}
              onChange={() => setShowOnlyDelivery(!showOnlyDelivery)}
              color="primary"
            />
          }
          label="Show only stores with delivery"
        />
      </Box>

      <Grid container spacing={3}>
        {filteredStores.map((store) => (
          <Grid item xs={12} key={store.id}>
            <Card 
              elevation={1}
              sx={{ 
                borderRadius: 2,
                '&:hover': { boxShadow: 4 }
              }}
            >
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={7} md={8}>
                    <Box display="flex" alignItems="center">
                      <CardMedia
                        component="img"
                        sx={{ width: 50, height: 50, mr: 2, objectFit: 'contain' }}
                        image={store.logo}
                        alt={store.name}
                      />
                      <Box>
                        <Box display="flex" alignItems="center">
                          <Typography variant="h6" component="div">
                            {store.name}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => toggleFavorite(store.id)}
                            sx={{ ml: 1 }}
                          >
                            {favoriteStores.includes(store.id) ? (
                              <Favorite color="error" fontSize="small" />
                            ) : (
                              <FavoriteBorder fontSize="small" />
                            )}
                          </IconButton>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Chip 
                            icon={<StoreIcon fontSize="small" />} 
                            label={store.type} 
                            size="small" 
                            variant="outlined"
                          />
                          <Rating value={store.rating} precision={0.1} size="small" readOnly />
                          <Typography variant="body2" color="text.secondary">
                            ({store.rating})
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Distance
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {store.distance}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Available
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {store.availableQuantity} units
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Delivery
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {store.delivery ? store.deliveryFee : 'Not available'}
                        </Typography>
                      </Box>
                      
                      {store.discount && (
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Discount
                          </Typography>
                          <Typography variant="body1" fontWeight="medium" color="error">
                            {store.discount}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={5} md={4}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: { xs: 'flex-start', sm: 'flex-end' }
                      }}
                    >
                      <Box mb={1}>
                        {store.originalPrice > store.price && (
                          <Typography 
                            variant="body1" 
                            color="text.secondary" 
                            sx={{ textDecoration: 'line-through' }}
                          >
                            ₹{store.originalPrice}
                          </Typography>
                        )}
                        <Typography variant="h5" color="primary" fontWeight="bold">
                          ₹{store.price}
                        </Typography>
                      </Box>
                      
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          gap: 1,
                          flexDirection: { xs: 'column', md: 'row' },
                          width: { xs: '100%', md: 'auto' }
                        }}
                      >
                        {store.distance !== 'Online' && (
                          <Button 
                            variant="outlined" 
                            color="primary"
                            startIcon={<DirectionsWalk />}
                            size={isMobile ? 'small' : 'medium'}
                            fullWidth={isMobile}
                          >
                            Directions
                          </Button>
                        )}
                        
                        <Button 
                          variant="contained" 
                          color="primary"
                          startIcon={<ShoppingCart />}
                          size={isMobile ? 'small' : 'medium'}
                          fullWidth={isMobile}
                        >
                          {store.delivery ? 'Order Online' : 'Add to List'}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductComparison; 
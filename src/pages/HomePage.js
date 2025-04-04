import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Button, 
  Card, 
  CardContent, 
  CardMedia,
  Paper,
  useTheme,
  useMediaQuery,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import DealsSection from '../components/deals/DealsSection';
import { 
  LocalOffer as OfferIcon, 
  CompareArrows as CompareIcon, 
  Store as StoreIcon, 
  Storefront as MarketIcon,
  LocationOn as LocationIcon,
  EmojiObjects as TipIcon,
  TrendingDown as TrendingDownIcon,
  Apartment as SupermarketIcon,
  Computer as OnlineIcon,
  DirectionsWalk as DirectionsIcon
} from '@mui/icons-material';

// Import product images
import basmatRiceImg from '../assets/images/basmati_rice.jpeg';
import sugarImg from '../assets/images/sugar.jpeg';
import peanutsImg from '../assets/images/peanuts.jpeg';
import turDaalImg from '../assets/images/tur_daal.jpeg';
import wheatImg from '../assets/images/wheat.jpeg';

// Sample nearby stores
const nearbyStores = [
  { name: 'Fresh Market', type: 'Supermarket', distance: '0.5 km', image: 'https://via.placeholder.com/100' },
  { name: 'Kirana Store', type: 'Local Store', distance: '0.8 km', image: 'https://via.placeholder.com/100' },
  { name: 'Premium Grocery', type: 'Supermarket', distance: '1.2 km', image: 'https://via.placeholder.com/100' }
];

// Simplified dummy data for price comparison
const comparisonData = [
  {
    id: 1,
    product: 'Basmati Rice (1kg)',
    category: 'Grains',
    image: basmatRiceImg,
    bigbasket: { price: 95, discount: null },
    blinkit: { price: 92, discount: null },
    offlineAverage: { price: 91, lowestPrice: 88, stores: 3 }
  },
  {
    id: 2,
    product: 'Sugar (1kg)',
    category: 'Essentials',
    image: sugarImg,
    bigbasket: { price: 55, discount: null },
    blinkit: { price: 52, discount: null },
    offlineAverage: { price: 50, lowestPrice: 48, stores: 4 }
  },
  {
    id: 3,
    product: 'Peanuts (500g)',
    category: 'Dry Fruits',
    image: peanutsImg,
    bigbasket: { price: 120, discount: null },
    blinkit: { price: 125, discount: null },
    offlineAverage: { price: 115, lowestPrice: 110, stores: 2 }
  },
  {
    id: 4,
    product: 'Tur Dal (1kg)',
    category: 'Pulses',
    image: turDaalImg,
    bigbasket: { price: 145, discount: null },
    blinkit: { price: 140, discount: null },
    offlineAverage: { price: 138, lowestPrice: 135, stores: 3 }
  },
  {
    id: 5,
    product: 'Wheat (1kg)',
    category: 'Grains',
    image: wheatImg,
    bigbasket: { price: 42, discount: null },
    blinkit: { price: 45, discount: null },
    offlineAverage: { price: 38, lowestPrice: 35, stores: 5 }
  }
];

// Helper function to find the lowest price for a product
const findLowestPrice = (product) => {
  const prices = [
    product.bigbasket.price,
    product.blinkit.price,
    product.offlineAverage.lowestPrice
  ];
  return Math.min(...prices);
};

// Helper function to determine if a price is the lowest
const isLowestPrice = (price, product) => {
  return price === findLowestPrice(product);
};

// Helper function to determine store with the lowest price
const findLowestPriceStore = (product) => {
  const bbPrice = product.bigbasket.price;
  const blPrice = product.blinkit.price;
  const offlinePrice = product.offlineAverage.lowestPrice;
  
  const lowestPrice = Math.min(bbPrice, blPrice, offlinePrice);
  
  if (lowestPrice === bbPrice) return 'BigBasket';
  if (lowestPrice === blPrice) return 'Blinkit';
  return 'Local Store';
};

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchResults, setSearchResults] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
    // In a real app, this would call an API to get actual results
    if (searchTerm && searchTerm.trim() !== '') {
      // Simulate search results with our existing data
      const results = comparisonData.filter(item => 
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results.length > 0 ? results : []);
    } else {
      setSearchResults(null);
    }
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(to right, #2E7D32, #43A047)',
          color: 'white',
          pt: { xs: 4, md: 6 },
          pb: { xs: 4, md: 6 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem' },
              textAlign: 'center'
            }}
          >
            Grocery Price Comparison
          </Typography>
          <Typography 
            variant="h6" 
            paragraph 
            sx={{ 
              mb: 3, 
              opacity: 0.9,
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            Find the best grocery deals by comparing prices across stores
          </Typography>
        </Container>
      </Box>

      {/* Search Section */}
      <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            py: 3,
            px: { xs: 2, md: 3 }
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom textAlign="center" fontWeight="bold">
            Find the Best Prices Near You
          </Typography>
          <SearchBar onSearch={handleSearch} />
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1,
              mt: 2
            }}
          >
            <LocationIcon color="action" fontSize="small" />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={selectedLocation}
                onChange={handleLocationChange}
                displayEmpty
                size="small"
              >
                <MenuItem value="" disabled>Select location</MenuItem>
                <MenuItem value="manewada">Manewada</MenuItem>
                <MenuItem value="nandanwan">Nandanwan</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Search Results */}
          {searchResults && (
            <Box sx={{ mt: 3 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Search Results ({searchResults.length})
              </Typography>
              
              {searchResults.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No results found. Try a different search term.
                  </Typography>
                </Box>
              ) : (
                <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 1, overflow: 'hidden' }}>
                  <Table>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="center">BigBasket</TableCell>
                        <TableCell align="center">Blinkit</TableCell>
                        <TableCell align="center">Local Stores</TableCell>
                        <TableCell align="center">Best Price</TableCell>
                        <TableCell align="center">Directions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {searchResults.map((item) => (
                        <TableRow key={item.id} sx={{ 
                          '&:nth-of-type(even)': { bgcolor: 'rgba(0,0,0,0.02)' } 
                        }}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box
                                component="img"
                                src={item.image}
                                alt={item.product}
                                sx={{ width: 40, height: 40, borderRadius: 1, mr: 2, objectFit: 'cover' }}
                              />
                              <Box>
                                <Typography variant="body1" fontWeight="medium">
                                  {item.product}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {item.category}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          
                          <TableCell align="center" sx={{ 
                            bgcolor: isLowestPrice(item.bigbasket.price, item) ? 'rgba(46, 125, 50, 0.08)' : 'transparent'
                          }}>
                            <Typography variant="body1" fontWeight={isLowestPrice(item.bigbasket.price, item) ? 'bold' : 'regular'}>
                              ₹{item.bigbasket.price}
                            </Typography>
                          </TableCell>
                          
                          <TableCell align="center" sx={{ 
                            bgcolor: isLowestPrice(item.blinkit.price, item) ? 'rgba(46, 125, 50, 0.08)' : 'transparent'
                          }}>
                            <Typography variant="body1" fontWeight={isLowestPrice(item.blinkit.price, item) ? 'bold' : 'regular'}>
                              ₹{item.blinkit.price}
                            </Typography>
                          </TableCell>
                          
                          <TableCell align="center" sx={{ 
                            bgcolor: isLowestPrice(item.offlineAverage.lowestPrice, item) ? 'rgba(46, 125, 50, 0.08)' : 'transparent'
                          }}>
                            <Typography variant="body1" fontWeight={isLowestPrice(item.offlineAverage.lowestPrice, item) ? 'bold' : 'regular'}>
                              ₹{item.offlineAverage.price}
                            </Typography>
                          </TableCell>
                          
                          <TableCell align="center">
                            <Chip 
                              label={`₹${findLowestPrice(item)} at ${findLowestPriceStore(item)}`}
                              color="success"
                              size="small"
                            />
                          </TableCell>
                          
                          <TableCell align="center">
                            <Button 
                              component="a"
                              href={`https://www.google.com/maps/search/${findLowestPriceStore(item)}+near+${selectedLocation || 'me'}`}
                              target="_blank"
                              size="small" 
                              variant="outlined" 
                              color="primary"
                              startIcon={<DirectionsIcon fontSize="small" />}
                              disabled={!selectedLocation}
                            >
                              Map
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}
        </Paper>
      </Container>

      {/* Main Comparison Table */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" textAlign="center">
          Price Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph textAlign="center">
          Compare grocery prices across different stores to find the best deals
        </Typography>
        
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>BigBasket</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Blinkit</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Local Stores</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Best Price</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Savings</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Directions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comparisonData.map((item) => (
                <TableRow key={item.id} sx={{ 
                  '&:nth-of-type(even)': { bgcolor: 'rgba(0,0,0,0.02)' } 
                }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.product}
                        sx={{ width: 50, height: 50, borderRadius: 1, mr: 2, objectFit: 'cover' }}
                      />
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          {item.product}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.category}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  
                  <TableCell align="center" sx={{ 
                    bgcolor: isLowestPrice(item.bigbasket.price, item) ? 'rgba(46, 125, 50, 0.08)' : 'transparent'
                  }}>
                    <Typography variant="body1" fontWeight={isLowestPrice(item.bigbasket.price, item) ? 'bold' : 'regular'}>
                      ₹{item.bigbasket.price}
                      {isLowestPrice(item.bigbasket.price, item) && (
                        <TrendingDownIcon 
                          fontSize="small" 
                          color="primary" 
                          sx={{ verticalAlign: 'text-bottom', ml: 0.5 }}
                        />
                      )}
                    </Typography>
                  </TableCell>
                  
                  <TableCell align="center" sx={{ 
                    bgcolor: isLowestPrice(item.blinkit.price, item) ? 'rgba(46, 125, 50, 0.08)' : 'transparent'
                  }}>
                    <Typography variant="body1" fontWeight={isLowestPrice(item.blinkit.price, item) ? 'bold' : 'regular'}>
                      ₹{item.blinkit.price}
                      {isLowestPrice(item.blinkit.price, item) && (
                        <TrendingDownIcon 
                          fontSize="small" 
                          color="primary" 
                          sx={{ verticalAlign: 'text-bottom', ml: 0.5 }}
                        />
                      )}
                    </Typography>
                  </TableCell>
                  
                  <TableCell align="center" sx={{ 
                    bgcolor: isLowestPrice(item.offlineAverage.lowestPrice, item) ? 'rgba(46, 125, 50, 0.08)' : 'transparent'
                  }}>
                    <Typography variant="body1" fontWeight={isLowestPrice(item.offlineAverage.lowestPrice, item) ? 'bold' : 'regular'}>
                      ₹{item.offlineAverage.price}
                      {isLowestPrice(item.offlineAverage.lowestPrice, item) && (
                        <TrendingDownIcon 
                          fontSize="small" 
                          color="primary" 
                          sx={{ verticalAlign: 'text-bottom', ml: 0.5 }}
                        />
                      )}
                    </Typography>
                  </TableCell>
                  
                  <TableCell align="center">
                    <Chip 
                      label={`₹${findLowestPrice(item)}`}
                      color="success"
                      size="small"
                      sx={{ fontWeight: 'bold' }}
                    />
                    <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                      at {findLowestPriceStore(item)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight="bold" color="error">
                      Save ₹{Math.max(...[item.bigbasket.price, item.blinkit.price, item.offlineAverage.price]) - findLowestPrice(item)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell align="center">
                    <Button 
                      component="a"
                      href={`https://www.google.com/maps/search/${findLowestPriceStore(item)}+near+${selectedLocation || 'me'}`}
                      target="_blank"
                      size="small" 
                      variant="outlined" 
                      color="primary"
                      startIcon={<DirectionsIcon fontSize="small" />}
                      disabled={!selectedLocation}
                    >
                      Map
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            * Prices last updated on {new Date().toLocaleDateString()} and are subject to change
          </Typography>
        </Box>
      </Container>

      {/* Tips Section - Simplified */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Paper 
          elevation={1}
          sx={{ 
            p: 3, 
            borderRadius: 2
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            <TipIcon sx={{ mr: 1, verticalAlign: 'text-bottom', color: theme.palette.primary.main }} />
            Shopping Tips
          </Typography>
          <Typography variant="body2" paragraph>
            Compare prices across stores | Check for ongoing promotions | Buy seasonal produce | Plan your grocery list in advance
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default HomePage;
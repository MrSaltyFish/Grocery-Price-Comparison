import React, { useState } from 'react';
import { Container, Typography, Box, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import ProductComparison from '../components/product/ProductComparison';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

const ComparePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setHasSearched(true);
    // In a real app, this would trigger an API call to get comparison data
  };

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
          <Typography color="text.primary">Compare</Typography>
        </Breadcrumbs>
      </Box>

      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Compare Grocery Prices
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Search for products and compare prices from multiple stores near you to find the best deals.
        </Typography>
        
        <SearchBar onSearch={handleSearch} />
      </Box>

      {hasSearched ? (
        <>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
            Search Results for "{searchTerm}"
          </Typography>
          <ProductComparison />
        </>
      ) : (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 10, 
            bgcolor: '#f5f5f5', 
            borderRadius: 2,
            my: 6
          }}
        >
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Enter a product name to compare prices
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try searching for items like "Milk", "Bread", "Rice" or any other grocery item.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ComparePage;
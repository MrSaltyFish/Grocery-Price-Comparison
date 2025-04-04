import React from 'react';
import { Container, Typography, Box, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DealsSection from '../components/deals/DealsSection';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

const DealsPage = () => {
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
          <Typography color="text.primary">Deals & Offers</Typography>
        </Breadcrumbs>
      </Box>

      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Deals & Offers
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Discover the best deals, discounts, and special offers from stores near you.
        </Typography>
      </Box>

      <DealsSection />
    </Container>
  );
};

export default DealsPage; 
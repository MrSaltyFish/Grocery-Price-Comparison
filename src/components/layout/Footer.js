import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Divider,
  IconButton,
  Stack
} from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn,
  LocalPhone,
  Email,
  LocationOn
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#1B5E20', color: 'white', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              GroceryCompare
            </Typography>
            <Typography variant="body2" paragraph>
              Compare grocery prices from local stores and online platforms to find the best deals near you.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Home
            </Link>
            <Link href="/deals" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Deals
            </Link>
            <Link href="/stores" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Stores
            </Link>
            <Link href="/compare" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Price Comparison
            </Link>
            <Link href="/subscriptions" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Subscriptions
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Company
            </Typography>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              About Us
            </Link>
            <Link href="/contact" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Contact Us
            </Link>
            <Link href="/privacy" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Terms of Service
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact Us
            </Typography>
            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
              <LocationOn sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="body2">
                123 Market Street, Mumbai, India
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
              <LocalPhone sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="body2">
                +91 9876543210
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Email sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="body2">
                info@grocerycompare.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} GroceryCompare. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Tabs,
  Tab,
  Divider,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  LocalOffer as OfferIcon,
  AccessTime as TimeIcon,
  Store as StoreIcon
} from '@mui/icons-material';

// Import product images
import basmatRiceImage from '../../assets/images/basmati_rice.jpeg';
import peanutsImage from '../../assets/images/peanuts.jpeg';
import sugarImage from '../../assets/images/sugar.jpeg';
import turDaalImage from '../../assets/images/tur_daal.jpeg';
import wheatImage from '../../assets/images/wheat.jpeg';

// Import store images for store icons
import store1Image from '../../assets/images/store1.jpeg';
import store2Image from '../../assets/images/store2.jpeg';
import store3Image from '../../assets/images/store3.jpeg';

// Sample data for deals - in a real app, this would come from API
const dealsData = [
  {
    id: 1,
    title: "Weekend Flash Sale on Rice",
    store: "Fresh Market",
    storeIcon: store1Image,
    discount: "Up to 25% off",
    category: "Basmati Rice",
    expiryDate: "2 days left",
    image: basmatRiceImage,
    type: "flash"
  },
  {
    id: 2,
    title: "Get 10% cashback on Peanuts",
    store: "Kirana Store",
    storeIcon: store2Image,
    discount: "10% cashback",
    category: "Whole Peanuts",
    expiryDate: "1 week left",
    image: peanutsImage,
    type: "cashback"
  },
  {
    id: 3,
    title: "Buy 1 Get 1 Free on Sugar",
    store: "Premium Grocery",
    storeIcon: store3Image,
    discount: "Buy 1 Get 1",
    category: "Pure Refined Sugar",
    expiryDate: "3 days left",
    image: sugarImage,
    type: "bogo"
  },
  {
    id: 4,
    title: "New User Offer on Tur Daal",
    store: "BigBasket",
    storeIcon: store1Image,
    discount: "Flat ₹100 off",
    category: "First order only",
    expiryDate: "Ongoing",
    image: turDaalImage,
    type: "first_order"
  },
  {
    id: 5,
    title: "Festival Special on Wheat",
    store: "Fresh Market",
    storeIcon: store2Image,
    discount: "Up to 30% off",
    category: "Premium Wheat",
    expiryDate: "5 days left",
    image: wheatImage,
    type: "seasonal"
  },
  {
    id: 6,
    title: "Free Delivery with Rice",
    store: "BigBasket",
    storeIcon: store3Image,
    discount: "Free Delivery",
    category: "Orders above ₹700",
    expiryDate: "Ongoing",
    image: basmatRiceImage,
    type: "delivery"
  }
];

const DealsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Filter deals based on selected tab
  const getFilteredDeals = () => {
    if (currentTab === 0) return dealsData;
    if (currentTab === 1) return dealsData.filter(deal => ['flash', 'seasonal'].includes(deal.type));
    if (currentTab === 2) return dealsData.filter(deal => deal.type === 'bogo');
    if (currentTab === 3) return dealsData.filter(deal => deal.type === 'cashback');
    if (currentTab === 4) return dealsData.filter(deal => deal.type === 'delivery');
    return dealsData;
  };

  const filteredDeals = getFilteredDeals();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Ongoing Deals & Discounts
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Discover the best offers and promotions from stores near you
        </Typography>
        
        <Box sx={{ width: '100%', mb: 3 }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
            centered={!isMobile}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#2E7D32',
              },
              '& .Mui-selected': {
                color: '#2E7D32',
              },
            }}
          >
            <Tab label="All Deals" />
            <Tab label="Flash Sales" />
            <Tab label="Buy One Get One" />
            <Tab label="Cashback" />
            <Tab label="Free Delivery" />
          </Tabs>
        </Box>
        
        <Grid container spacing={3}>
          {filteredDeals.map((deal) => (
            <Grid item xs={12} sm={6} md={4} key={deal.id}>
              <Card 
                elevation={2}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={deal.image}
                  alt={deal.title}
                />
                
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar
                      src={deal.storeIcon}
                      alt={deal.store}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    <Typography variant="subtitle2" color="text.secondary">
                      {deal.store}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', height: '3em', overflow: 'hidden' }}
                  >
                    {deal.title}
                  </Typography>
                  
                  <Chip 
                    icon={<OfferIcon />} 
                    label={deal.discount} 
                    color="error" 
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {deal.category}
                  </Typography>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mt: 1
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {deal.expiryDate}
                      </Typography>
                    </Box>
                    
                    <Button 
                      size="small" 
                      variant="outlined"
                      color="primary"
                      sx={{ borderRadius: 4 }}
                    >
                      View Deal
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {filteredDeals.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No deals found in this category
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2 }}
              onClick={() => setCurrentTab(0)}
            >
              View All Deals
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default DealsSection; 
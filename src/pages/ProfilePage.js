import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Breadcrumbs, 
  Link, 
  Paper,
  Grid,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Card,
  CardContent,
  Tab,
  Tabs
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { 
  NavigateNext as NavigateNextIcon, 
  Person as PersonIcon,
  LocationOn as LocationIcon,
  History as HistoryIcon,
  Favorite as FavoriteIcon,
  Settings as SettingsIcon,
  ShoppingCart as CartIcon,
  LocalOffer as CouponIcon,
  Notifications as NotificationIcon
} from '@mui/icons-material';

const ProfilePage = () => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
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
          <Typography color="text.primary">Profile</Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Profile Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar 
                sx={{ 
                  width: 100, 
                  height: 100, 
                  bgcolor: '#2E7D32',
                  mb: 2
                }}
              >
                <PersonIcon fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight="bold">John Doe</Typography>
              <Typography variant="body2" color="text.secondary">john.doe@example.com</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <LocationIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                Mumbai, Maharashtra
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2 }}
                fullWidth
              >
                Edit Profile
              </Button>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <List component="nav" aria-label="profile navigation">
              <ListItem button selected>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Order History" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Saved Stores" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CouponIcon />
                </ListItemIcon>
                <ListItemText primary="My Coupons" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <NotificationIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Right Column - Tabs and Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ borderRadius: 2 }}>
            <Tabs 
              value={currentTab} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTabs-indicator': {
                  backgroundColor: '#2E7D32',
                },
                '& .Mui-selected': {
                  color: '#2E7D32',
                },
              }}
            >
              <Tab label="Dashboard" />
              <Tab label="Saved Lists" />
              <Tab label="Price Alerts" />
            </Tabs>
            
            <Box sx={{ p: 3 }}>
              {currentTab === 0 && (
                <>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Dashboard
                  </Typography>
                  
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={4}>
                      <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                          <HistoryIcon color="primary" fontSize="large" sx={{ mb: 1 }} />
                          <Typography variant="h4">5</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Recent Orders
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                          <FavoriteIcon color="primary" fontSize="large" sx={{ mb: 1 }} />
                          <Typography variant="h4">8</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Saved Stores
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                          <CouponIcon color="primary" fontSize="large" sx={{ mb: 1 }} />
                          <Typography variant="h4">3</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Active Coupons
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Recent Activity
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CartIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Ordered groceries from Fresh Market" 
                        secondary="12 May 2023, 10:30 AM" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FavoriteIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Added Premium Grocery to favorites" 
                        secondary="10 May 2023, 4:15 PM" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CartIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Ordered groceries from BigBasket" 
                        secondary="8 May 2023, 2:45 PM" 
                      />
                    </ListItem>
                  </List>
                </>
              )}
              
              {currentTab === 1 && (
                <>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Your Saved Shopping Lists
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Create and manage shopping lists to make your grocery shopping easier.
                  </Typography>
                  
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      You don't have any saved shopping lists yet.
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      sx={{ mt: 2 }}
                    >
                      Create New List
                    </Button>
                  </Box>
                </>
              )}
              
              {currentTab === 2 && (
                <>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Price Alerts
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Get notified when prices drop for your favorite products.
                  </Typography>
                  
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      You don't have any price alerts set up yet.
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      sx={{ mt: 2 }}
                    >
                      Create Price Alert
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage; 
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  LocationOn as LocationIcon 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [locationAnchorEl, setLocationAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLocationOpen = (event) => {
    setLocationAnchorEl(event.currentTarget);
  };

  const handleLocationClose = () => {
    setLocationAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#2E7D32' }}>
      <Toolbar>
        {isMobile && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold', 
            textDecoration: 'none', 
            color: 'white',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Khareedlo
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            color="inherit" 
            startIcon={<LocationIcon />} 
            onClick={handleLocationOpen}
            sx={{ mr: 1 }}
          >
            Location
          </Button>
          
          <Menu
            anchorEl={locationAnchorEl}
            open={Boolean(locationAnchorEl)}
            onClose={handleLocationClose}
          >
            <MenuItem onClick={handleLocationClose}>Change Location</MenuItem>
            <MenuItem onClick={handleLocationClose}>Use Current Location</MenuItem>
          </Menu>

          {!isMobile && (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/deals"
                sx={{ mr: 1 }}
              >
                Deals
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/stores"
                sx={{ mr: 1 }}
              >
                Stores
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/subscriptions"
                sx={{ mr: 1 }}
              >
                Subscriptions
              </Button>
              {/* <Button 
                color="inherit" 
                component={Link} 
                to="/compare"
                sx={{ mr: 1 }}
              >
                Compare
              </Button> */}
            </>
          )}
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/">Home</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/deals">Deals</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/stores">Stores</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/compare">Compare</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/subscriptions">Subscriptions</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 
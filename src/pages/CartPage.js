import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Breadcrumbs, 
  Link, 
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Divider,
  TextField,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { 
  NavigateNext as NavigateNextIcon, 
  DeleteOutline as DeleteIcon, 
  Add as AddIcon, 
  Remove as RemoveIcon,
  Store as StoreIcon,
  LocalShipping as ShippingIcon,
  CreditCard as PaymentIcon,
  CheckCircle as ConfirmIcon
} from '@mui/icons-material';

// Sample cart items
const cartItems = [
  {
    id: 1,
    name: 'Organic Milk',
    description: 'Fresh organic cow milk, 500ml',
    price: 45,
    quantity: 2,
    store: 'Fresh Market',
    image: 'https://via.placeholder.com/80'
  },
  {
    id: 2,
    name: 'Whole Wheat Bread',
    description: 'Freshly baked whole wheat bread, 400g',
    price: 35,
    quantity: 1,
    store: 'Fresh Market',
    image: 'https://via.placeholder.com/80'
  },
  {
    id: 3,
    name: 'Farm Eggs',
    description: 'Pack of 6 free-range eggs',
    price: 60,
    quantity: 1,
    store: 'Kirana Store',
    image: 'https://via.placeholder.com/80'
  },
  {
    id: 4,
    name: 'Tomatoes',
    description: 'Fresh tomatoes, 500g',
    price: 30,
    quantity: 2,
    store: 'Premium Grocery',
    image: 'https://via.placeholder.com/80'
  }
];

const CartPage = () => {
  const [items, setItems] = useState(cartItems);
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState('delivery');

  const handleQuantityChange = (id, change) => {
    setItems(
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const deliveryFee = deliveryOption === 'delivery' ? 40 : 0;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Steps for checkout process
  const steps = ['Cart', 'Delivery', 'Payment', 'Confirmation'];

  // Group items by store
  const itemsByStore = items.reduce((acc, item) => {
    if (!acc[item.store]) {
      acc[item.store] = [];
    }
    acc[item.store].push(item);
    return acc;
  }, {});

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
          <Typography color="text.primary">Cart</Typography>
        </Breadcrumbs>
      </Box>
      
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Your Shopping Cart
      </Typography>
      
      <Box mb={4}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {items.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={RouterLink} 
            to="/"
            sx={{ mt: 2 }}
          >
            Start Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {activeStep === 0 && (
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                {Object.entries(itemsByStore).map(([store, storeItems]) => (
                  <Box key={store} mb={4}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <StoreIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" fontWeight="bold">{store}</Typography>
                    </Box>
                    
                    <List disablePadding>
                      {storeItems.map((item) => (
                        <React.Fragment key={item.id}>
                          <ListItem 
                            sx={{ 
                              py: 2, 
                              px: 0
                            }}
                          >
                            <CardMedia
                              component="img"
                              sx={{ width: 80, height: 80, borderRadius: 1, mr: 2 }}
                              image={item.image}
                              alt={item.name}
                            />
                            <ListItemText
                              primary={
                                <Typography variant="subtitle1" fontWeight="medium">
                                  {item.name}
                                </Typography>
                              }
                              secondary={
                                <Box>
                                  <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                  </Typography>
                                  <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                                    ₹{item.price}
                                  </Typography>
                                </Box>
                              }
                            />
                            <Box display="flex" alignItems="center">
                              <IconButton
                                size="small"
                                onClick={() => handleQuantityChange(item.id, -1)}
                                disabled={item.quantity === 1}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography sx={{ mx: 1, minWidth: 20, textAlign: 'center' }}>
                                {item.quantity}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                            <Typography variant="subtitle1" fontWeight="medium" sx={{ ml: 3, minWidth: 80, textAlign: 'right' }}>
                              ₹{item.price * item.quantity}
                            </Typography>
                            <IconButton 
                              edge="end" 
                              aria-label="delete"
                              onClick={() => handleRemoveItem(item.id)}
                              sx={{ ml: 1 }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                ))}
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Continue to Delivery
                  </Button>
                </Box>
              </Paper>
            )}
            
            {activeStep === 1 && (
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Delivery Options
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="delivery-option-label">Delivery Option</InputLabel>
                  <Select
                    labelId="delivery-option-label"
                    value={deliveryOption}
                    label="Delivery Option"
                    onChange={handleDeliveryOptionChange}
                  >
                    <MenuItem value="delivery">Home Delivery (₹40)</MenuItem>
                    <MenuItem value="pickup">Store Pickup (Free)</MenuItem>
                  </Select>
                </FormControl>
                
                <Typography variant="subtitle1" gutterBottom>
                  Delivery Address
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField 
                      label="Full Address" 
                      fullWidth 
                      multiline
                      rows={3}
                      defaultValue="123 Main Street, Apartment 4B, Andheri East, Mumbai, Maharashtra 400069"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="City" fullWidth defaultValue="Mumbai" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Postal Code" fullWidth defaultValue="400069" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Phone Number" fullWidth defaultValue="+91 9876543210" />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack}>
                    Back to Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Continue to Payment
                  </Button>
                </Box>
              </Paper>
            )}
            
            {activeStep === 2 && (
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Payment Method
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  All transactions are secure and encrypted.
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField label="Cardholder Name" fullWidth defaultValue="John Doe" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Card Number" fullWidth defaultValue="**** **** **** 1234" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Expiry Date" fullWidth defaultValue="12/25" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="CVV" fullWidth defaultValue="***" />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack}>
                    Back to Delivery
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Complete Order
                  </Button>
                </Box>
              </Paper>
            )}
            
            {activeStep === 3 && (
              <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                <Box sx={{ py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ConfirmIcon color="primary" sx={{ fontSize: 80, mb: 2 }} />
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    Thank you for your order!
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Your order has been placed successfully. We've sent a confirmation to your email.
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="medium" sx={{ mt: 2 }}>
                    Order Number: #GC78952
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    component={RouterLink} 
                    to="/"
                    sx={{ mt: 4 }}
                  >
                    Continue Shopping
                  </Button>
                </Box>
              </Paper>
            )}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Order Summary
              </Typography>
              
              <List disablePadding>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Subtotal" />
                  <Typography variant="body1">₹{subtotal}</Typography>
                </ListItem>
                
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary={`Delivery ${deliveryOption === 'delivery' ? '(Standard)' : '(Store Pickup)'}`} 
                  />
                  <Typography variant="body1">
                    {deliveryOption === 'delivery' ? `₹${deliveryFee}` : 'Free'}
                  </Typography>
                </ListItem>
                
                <Divider sx={{ my: 1 }} />
                
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        Total
                      </Typography>
                    } 
                  />
                  <Typography variant="subtitle1" fontWeight="bold">
                    ₹{total}
                  </Typography>
                </ListItem>
              </List>
              
              {activeStep < 3 && (
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={handleNext}
                >
                  {activeStep === 2 ? 'Complete Order' : 'Continue'}
                </Button>
              )}
              
              {activeStep === 0 && (
                <Button 
                  variant="outlined" 
                  color="primary" 
                  fullWidth
                  component={RouterLink}
                  to="/"
                  sx={{ mt: 2 }}
                >
                  Continue Shopping
                </Button>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CartPage; 
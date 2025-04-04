import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Switch,
  FormControlLabel,
  useTheme,
  TextField,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Chip
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  StarBorder as StarIcon,
  Star as StarFilledIcon,
  ShoppingBasket as BasketIcon,
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon,
  Key as KeyIcon,
  LocalFireDepartment as FireIcon
} from '@mui/icons-material';

const SubscriptionsPage = () => {
  const theme = useTheme();
  const [annual, setAnnual] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleBillingChange = () => {
    setAnnual(!annual);
  };

  // Generate a random API key
  const generateApiKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const keyParts = [8, 4, 4, 4, 12]; // Format like: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    
    keyParts.forEach((length, index) => {
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      if (index < keyParts.length - 1) {
        result += '-';
      }
    });
    
    setApiKey(result);
    setSnackbarMessage('New API key generated');
    setShowSnackbar(true);
  };

  // Copy API key to clipboard
  const copyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setSnackbarMessage('API key copied to clipboard');
      setShowSnackbar(true);
    }
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  // Pricing plans with monthly and annual options (in rupees)
  const plans = [
    {
      title: 'Free',
      price: { monthly: 0, annual: 0 },
      highlighted: false,
      features: [
        { text: 'Basic price comparison', included: true },
        { text: 'Up to 5 product searches per day', included: true },
        { text: 'View current deals', included: true },
        { text: 'Price history (7 days)', included: true },
        { text: 'Ad-supported experience', included: true },
        { text: 'Price alerts', included: false },
        { text: 'Personalized recommendations', included: false },
        { text: 'Advanced filters', included: false },
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outlined',
    },
    {
      title: 'Basic',
      price: { monthly: 99, annual: 999 },
      highlighted: true,
      features: [
        { text: 'Unlimited price comparisons', included: true },
        { text: 'No daily search limits', included: true },
        { text: 'Ad-free experience', included: true },
        { text: 'Price history (30 days)', included: true },
        { text: 'Price drop alerts (5 items)', included: true },
        { text: 'Shopping list management', included: true },
        { text: 'Basic personalized recommendations', included: true },
        { text: 'Email support', included: true },
      ],
      buttonText: 'Subscribe Now',
      buttonVariant: 'contained',
    },
    {
      title: 'Premium',
      price: { monthly: 249, annual: 2499 },
      highlighted: false,
      features: [
        { text: 'All Basic features', included: true },
        { text: 'Price history (Full history)', included: true },
        { text: 'Unlimited price drop alerts', included: true },
        { text: 'Advanced product filters', included: true },
        { text: 'Exclusive deals & cashback', included: true },
        { text: 'Detailed price analytics', included: true },
        { text: 'Priority support', included: true },
        { text: 'Family account sharing (up to 3)', included: true },
      ],
      buttonText: 'Go Premium',
      buttonVariant: 'contained',
    },
  ];

  // Calculate savings for annual plans
  const calculateSavings = (plan) => {
    if (plan.price.monthly === 0) return 0;
    return Math.round(plan.price.monthly * 12 - plan.price.annual);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Choose Your Plan
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
          Get the best grocery deals with our premium features. Save money on every shopping trip.
        </Typography>

        {/* Billing Toggle */}
        <Paper
          elevation={0}
          sx={{
            display: 'inline-flex',
            p: 1,
            borderRadius: 2,
            bgcolor: 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
            maxWidth: 'fit-content',
            mx: 'auto',
          }}
        >
          <FormControlLabel
            control={
              <Switch 
                checked={annual}
                onChange={handleBillingChange}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Monthly
                </Typography>
                <Typography variant="body2" fontWeight={annual ? 'bold' : 'regular'} color={annual ? 'primary' : 'text.primary'}>
                  Annual (Save up to ₹689)
                </Typography>
              </Box>
            }
            labelPlacement="end"
          />
        </Paper>
      </Box>

      {/* Plans Grid */}
      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan) => (
          <Grid item key={plan.title} xs={12} sm={6} md={4}>
            <Card
              elevation={plan.highlighted ? 8 : 2}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                borderRadius: 2,
                transform: plan.highlighted ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 0.3s ease',
                ...(plan.highlighted && {
                  borderColor: theme.palette.primary.main,
                  borderWidth: 2,
                  borderStyle: 'solid',
                  boxShadow: `0 0 20px rgba(46, 125, 50, 0.3)`,
                  zIndex: 1
                }),
              }}
            >
              {plan.highlighted && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bgcolor: theme.palette.secondary.main,
                    color: 'white',
                    px: 2,
                    py: 0.8,
                    borderTopRightRadius: 2,
                    borderBottomLeftRadius: 12,
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    zIndex: 1,
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': {
                        boxShadow: '0 0 0 0 rgba(255, 160, 0, 0.4)',
                      },
                      '70%': {
                        boxShadow: '0 0 0 10px rgba(255, 160, 0, 0)',
                      },
                      '100%': {
                        boxShadow: '0 0 0 0 rgba(255, 160, 0, 0)',
                      },
                    },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  <FireIcon fontSize="small" />
                  POPULAR
                </Box>
              )}

              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {plan.highlighted ? (
                      <StarFilledIcon sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                    ) : (
                      plan.title !== 'Free' && <StarIcon sx={{ color: 'text.secondary', mr: 1 }} />
                    )}
                    <Typography variant="h5" component="span" fontWeight="bold">
                      {plan.title}
                    </Typography>
                  </Box>
                }
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                sx={{ pb: 0 }}
              />
              
              <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                <Box sx={{ textAlign: 'center', my: 3 }}>
                  {plan.price[annual ? 'annual' : 'monthly'] === 0 ? (
                    <Typography variant="h3" component="div" fontWeight="bold">
                      Free
                    </Typography>
                  ) : (
                    <>
                      <Typography variant="h3" component="div" fontWeight="bold">
                        ₹{plan.price[annual ? 'annual' : 'monthly']}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        per {annual ? 'year' : 'month'}
                      </Typography>
                      {annual && calculateSavings(plan) > 0 && (
                        <Typography variant="caption" color="success.main" fontWeight="bold">
                          Save ₹{calculateSavings(plan)} yearly
                        </Typography>
                      )}
                      {plan.highlighted && (
                        <Box sx={{ mt: 1 }}>
                          <Chip
                            label="Recommended"
                            size="small" 
                            color="primary"
                            sx={{ fontWeight: 'bold' }}
                          />
                        </Box>
                      )}
                    </>
                  )}
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <List dense sx={{ py: 0 }}>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {feature.included ? (
                          <CheckIcon color="success" fontSize="small" />
                        ) : (
                          <CancelIcon color="disabled" fontSize="small" />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature.text} 
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: feature.included ? 'text.primary' : 'text.disabled'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Button
                    fullWidth
                    variant={plan.buttonVariant}
                    color={plan.highlighted ? "secondary" : "primary"}
                    sx={{ 
                      py: 1.2,
                      ...(plan.highlighted && {
                        fontWeight: 'bold',
                        boxShadow: theme.shadows[4],
                        '&:hover': {
                          boxShadow: theme.shadows[6],
                        }
                      }),
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* API Key Generation Section */}
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <KeyIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="h5" fontWeight="bold">
                API Access
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Generate your API key to integrate our price comparison data into your own applications.
              Premium subscribers get higher rate limits and access to advanced endpoints.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Keep your API key secret! If compromised, you can generate a new key at any time.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<RefreshIcon />}
              onClick={generateApiKey}
              sx={{ mt: 1 }}
            >
              Generate API Key
            </Button>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                label="Your API Key"
                value={apiKey}
                placeholder="Click 'Generate API Key' to create a new key"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <Tooltip title="Copy to clipboard">
                      <IconButton 
                        edge="end" 
                        onClick={copyApiKey}
                        disabled={!apiKey}
                      >
                        <CopyIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              {apiKey && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                    Example API request:
                  </Typography>
                  <Paper 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'grey.900', 
                      color: 'grey.100',
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      overflowX: 'auto'
                    }}
                  >
                    {`curl -X GET "https://api.grocerycompare.com/prices"\n -H "x-api-key: ${apiKey}"`}
                  </Paper>
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                      Your API Usage Limits
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12}>
                        <Paper 
                          variant="outlined" 
                          sx={{ 
                            p: 2, 
                            borderColor: theme.palette.divider,
                            bgcolor: 'background.paper'
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={6} sm={4}>
                              <Typography variant="body2" color="text.secondary">
                                Plan
                              </Typography>
                              <Typography variant="body1" fontWeight="medium">
                                Premium
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                              <Typography variant="body2" color="text.secondary">
                                Rate Limit
                              </Typography>
                              <Typography variant="body1" fontWeight="medium">
                                5,000 req/day
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                              <Typography variant="body2" color="text.secondary">
                                Status
                              </Typography>
                              <Typography variant="body1" fontWeight="medium" color="success.main">
                                Active
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      API rate limits: Free: 100 req/day | Basic: 1,000 req/day | Premium: 5,000 req/day
                    </Typography>
                    
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                        API Documentation
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          href="#/api-docs"
                          target="_blank"
                          sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                        >
                          Getting Started Guide
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          href="#/api-reference"
                          target="_blank"
                          sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                        >
                          API Reference
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          href="#/api-examples"
                          target="_blank"
                          sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                        >
                          Code Examples
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* FAQ Section */}
      <Paper elevation={1} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center">
          Frequently Asked Questions
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              How do the subscriptions work?
            </Typography>
            <Typography variant="body2" paragraph>
              Our subscription plans give you access to premium features that help you find the best grocery deals. Choose the plan that fits your needs and start saving money on your grocery shopping.
            </Typography>
            
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Can I cancel my subscription?
            </Typography>
            <Typography variant="body2" paragraph>
              Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to your plan until the end of your billing period.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Is there a free trial?
            </Typography>
            <Typography variant="body2" paragraph>
              Yes, we offer a 7-day free trial for our Basic and Premium plans so you can experience all the features before committing.
            </Typography>
            
            <Typography variant="h6" gutterBottom fontWeight="medium">
              How do I change my subscription plan?
            </Typography>
            <Typography variant="body2" paragraph>
              You can upgrade or downgrade your subscription at any time from your account settings. Changes will be applied at the start of your next billing cycle.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Testimonials Preview */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          What Our Users Say
        </Typography>
        <Typography variant="body1" color="text.secondary">
          "I saved over ₹1,200 on my monthly grocery bill using this app's price comparison feature!" - Priya S.
        </Typography>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SubscriptionsPage; 
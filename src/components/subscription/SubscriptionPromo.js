import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  StarOutline as StarIcon,
  TrendingUp as TrendingUpIcon,
  NotificationsActive as NotificationIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SubscriptionPromo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const benefits = [
    {
      icon: <StarIcon fontSize="medium" color="primary" />,
      title: 'Premium Features',
      description: 'Get access to advanced price tracking, personalized alerts, and more.'
    },
    {
      icon: <TrendingUpIcon fontSize="medium" color="primary" />,
      title: 'Save More Money',
      description: 'Our premium users save an average of ₹1,500 monthly on groceries.'
    },
    {
      icon: <NotificationIcon fontSize="medium" color="primary" />,
      title: 'Price Drop Alerts',
      description: 'Get notified instantly when prices drop for your favorite products.'
    }
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e9f1f7 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: '50%',
          bgcolor: 'rgba(46, 125, 50, 0.1)',
          zIndex: 0
        }}
      />
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          fontWeight="bold"
          color="primary"
        >
          Upgrade to Premium
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ mb: 3 }}
        >
          Unlock all features and save more money on your grocery shopping with our premium subscription plans.
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box sx={{ mr: 1.5, mt: 0.5 }}>
                  {benefit.icon}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Button
            component={Link}
            to="/subscriptions"
            variant="contained"
            color="primary"
            size={isMobile ? "medium" : "large"}
            sx={{ fontWeight: 'medium' }}
          >
            View Plans
          </Button>
          
          <Typography variant="body2" color="text.secondary">
            Starting at just ₹99/month
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default SubscriptionPromo; 
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Hospital Management System
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Streamline your healthcare operations with our comprehensive management solution
          </Typography>
          <Button 
            component={Link}
            to="/register"
            variant="contained" 
            color="secondary"
            size="large"
            sx={{ mt: 4 }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Our Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Hospital Management
            </Typography>
            <Typography>
              Efficiently manage hospital operations, staff, and resources through our intuitive interface.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Patient Care
            </Typography>
            <Typography>
              Track patient records, appointments, and treatment plans in one centralized system.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Smart Analytics
            </Typography>
            <Typography>
              Make data-driven decisions with comprehensive analytics and reporting tools.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
  Alert,
  CardMedia,
  Rating,
  Chip,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/v1/hospitals', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched hospitals:', data); // Debug log
      setHospitals(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching hospitals:', err); // Debug log
      setError(err.message || 'Error fetching hospitals');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Hospitals
        </Typography>
        <Button
          component={Link}
          to="/hospitals/create"
          variant="contained"
          color="primary"
        >
          Add New Hospital
        </Button>
      </Box>

      <Grid container spacing={3}>
        {hospitals.length === 0 ? (
          <Grid item xs={12}>
            <Alert severity="info">
              No hospitals found. Click "Add New Hospital" to create one.
            </Alert>
          </Grid>
        ) : (
          hospitals.map((hospital) => (
            <Grid item xs={12} sm={6} md={4} key={hospital._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={hospital.imageUrl || 'https://via.placeholder.com/400x200?text=Hospital+Image'}
                  alt={hospital.name}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = 'https://via.placeholder.com/400x200?text=Hospital+Image';
                  }}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {hospital.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {hospital.city}
                  </Typography>
                  <Box sx={{ mb: 1.5 }}>
                    <Rating value={hospital.rating} precision={0.5} readOnly />
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {hospital.address}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                    {hospital.specialities.map((speciality, index) => (
                      <Chip
                        key={index}
                        label={speciality}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/hospitals/${hospital._id}`}
                    size="small"
                    color="primary"
                  >
                    View Details
                  </Button>
                  <Button
                    component={Link}
                    to={`/hospitals/${hospital._id}/edit`}
                    size="small"
                    color="primary"
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Hospitals; 
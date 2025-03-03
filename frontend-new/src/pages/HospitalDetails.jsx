import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const HospitalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHospitalDetails();
  }, [id]);

  const fetchHospitalDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/v1/hospitals/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Received non-JSON response from server");
      }

      const data = await response.json();
      setHospital(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching hospital details:', err);
      setError(err.message || 'Error fetching hospital details');
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
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/hospitals')}
          sx={{ mt: 2 }}
        >
          Back to Hospitals
        </Button>
      </Container>
    );
  }

  if (!hospital) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Hospital not found</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/hospitals')}
          sx={{ mt: 2 }}
        >
          Back to Hospitals
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/hospitals')}
        sx={{ mb: 3 }}
      >
        Back to Hospitals
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              {hospital.name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Typography>Email: {hospital.email || 'N/A'}</Typography>
            <Typography>Phone: {hospital.phone || 'N/A'}</Typography>
            <Typography>Address: {hospital.address || 'N/A'}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Specialities
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {(hospital.specialities || []).map((speciality, index) => (
                <Chip
                  key={index}
                  label={speciality}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>

          {hospital.description && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography>{hospital.description}</Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default HospitalDetails; 
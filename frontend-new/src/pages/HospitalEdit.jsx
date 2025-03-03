import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  Autocomplete,
  Rating,
  FormControl,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const specialitiesList = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Oncology',
  'Dermatology',
  'Gynecology',
  'Ophthalmology',
  'Psychiatry',
  'Dental',
];

const labels = {
  0.5: 'Poor',
  1: 'Poor+',
  1.5: 'Below Average',
  2: 'Average',
  2.5: 'Above Average',
  3: 'Good',
  3.5: 'Good+',
  4: 'Very Good',
  4.5: 'Excellent',
  5: 'Outstanding',
};

const HospitalEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    imageUrl: '',
    specialities: [],
    email: '',
    phone: '',
    rating: 0,
  });
  const [hover, setHover] = useState(-1);
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
      console.log('Fetched hospital data:', data); // Debug log
      setFormData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching hospital:', err); // Debug log
      setError(err.message || 'Error fetching hospital details');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSpecialitiesChange = (event, newValue) => {
    if (newValue.length > 5) {
      setError('Maximum 5 specialities are allowed');
      setFormData({
        ...formData,
        specialities: newValue.slice(0, 5),
      });
      return;
    }
    setError('');
    setFormData({
      ...formData,
      specialities: newValue,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.address || !formData.email || !formData.phone || !formData.city || !formData.imageUrl) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.specialities.length === 0) {
      setError('Please select at least one speciality');
      return;
    }

    if (formData.rating === 0) {
      setError('Please provide a rating');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/v1/hospitals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Update response:', data); // Debug log
      navigate('/hospitals');
    } catch (err) {
      console.error('Error updating hospital:', err); // Debug log
      setError(err.message || 'Error updating hospital');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography component="h1" variant="h4" gutterBottom>
            Edit Hospital
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Hospital Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={3}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/hospital-image.jpg"
            />
            <Autocomplete
              multiple
              id="specialities"
              options={specialitiesList}
              value={formData.specialities}
              onChange={handleSpecialitiesChange}
              limitTags={5}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  label="Specialities (Select 1-5)"
                  error={formData.specialities.length === 0}
                  helperText={
                    formData.specialities.length === 0
                      ? 'Please select at least one speciality'
                      : `Selected ${formData.specialities.length}/5 specialities`
                  }
                />
              )}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <FormControl 
              fullWidth 
              margin="normal"
              error={formData.rating === 0}
            >
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={formData.rating}
                precision={0.5}
                onChange={handleRatingChange}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {formData.rating !== null && (
                <Box sx={{ ml: 2 }}>
                  {labels[hover !== -1 ? hover : formData.rating]}
                </Box>
              )}
              {formData.rating === 0 && (
                <FormHelperText>Please provide a rating</FormHelperText>
              )}
            </FormControl>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={formData.specialities.length === 0 || formData.rating === 0}
              >
                Update Hospital
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/hospitals')}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default HospitalEdit; 
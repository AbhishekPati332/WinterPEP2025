import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const HospitalCreate = () => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSpecialitiesChange = (event, newValue) => {
    if (newValue.length > 5) {
      setError('Maximum 5 specialities are allowed');
      // Keep only the first 5 specialities
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

    // Basic validation
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
      const response = await fetch('http://localhost:5000/api/v1/hospitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create hospital');
      }

      navigate('/hospitals');
    } catch (err) {
      setError(err.message || 'Error creating hospital');
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography component="h1" variant="h4" gutterBottom>
            Add New Hospital
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formData.specialities.length === 0 || formData.rating === 0}
            >
              Create Hospital
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default HospitalCreate; 
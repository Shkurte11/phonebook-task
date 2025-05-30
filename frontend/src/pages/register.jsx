import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField, Button, Container, Typography, Paper, Box, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: '',
    LastName: '',
    Address: '',
    City: '',
    Country: '',
    Email: [''],
    Number: ['']
  });

  const [errors, setErrors] = useState({
    Name: '', LastName: '', Email: [''], Number: ['']
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'Name' || name === 'LastName') {
      if (value.length < 2) {
        setErrors(prev => ({ ...prev, [name]: 'Minimum 2 characters required' }));
      } else if (/[^a-zA-Z\s]/.test(value)) {
        setErrors(prev => ({ ...prev, [name]: 'No numbers or symbols allowed' }));
      } else {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleInputChange = (index, type, value) => {
    const newValues = [...formData[type]];
    newValues[index] = value;

    const newErrors = [...(errors[type] || [])];
    if (type === 'Email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      newErrors[index] = emailRegex.test(value) ? '' : 'Invalid email';
    } else if (type === 'Number') {
      newErrors[index] = /^\+\d{10,}$/.test(value) ? '' : 'Invalid phone number';
    }

    setFormData(prev => ({ ...prev, [type]: newValues }));
    setErrors(prev => ({ ...prev, [type]: newErrors }));
  };

  const addInputField = (type) => {
    setFormData(prev => ({ ...prev, [type]: [...prev[type], ''] }));
    setErrors(prev => ({ ...prev, [type]: [...(prev[type] || []), 'Required'] }));
  };

  const hasErrors = () => {
    const flatErrors = Object.values(errors).flat();
    return flatErrors.some(err => err !== '') || !formData.Name || !formData.LastName;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasErrors()) {
      alert('Please fix validation errors before submitting.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const { Name, LastName, Address, City, Country, Email, Number } = formData;

      const res = await axios.post(
          "http://localhost:3001/api/contact/register",
          {
            Name, LastName, Address, City, Country,
            Emails: Email, Numbers: Number
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
      );

      console.log("Success:", res.data);
      navigate('/');
    } catch (error) {
      console.error("Error:", error.response?.data || "Error during registration");
      alert("Registration failed: " + (error.response?.data.error || "Server error"));
    }
  };

  return (
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom>PhoneBook</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                fullWidth label="Name" name="Name" value={formData.Name}
                onChange={handleChange} error={!!errors.Name} helperText={errors.Name} margin="normal"
            />
            <TextField
                fullWidth label="Last Name" name="LastName" value={formData.LastName}
                onChange={handleChange} error={!!errors.LastName} helperText={errors.LastName} margin="normal"
            />
            <TextField
                fullWidth label="Address" name="Address" value={formData.Address}
                onChange={handleChange} margin="normal"
            />
            <TextField
                fullWidth label="City" name="City" value={formData.City}
                onChange={handleChange} margin="normal"
            />
            <TextField
                fullWidth label="Country" name="Country" value={formData.Country}
                onChange={handleChange} margin="normal"
            />

            {formData.Email.map((email, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                  <TextField
                      fullWidth label={`Email ${index + 1}`} value={email}
                      onChange={(e) => handleInputChange(index, 'Email', e.target.value)}
                      error={!!errors.Email?.[index]} helperText={errors.Email?.[index]} margin="normal"
                  />
                </Box>
            ))}
            <IconButton onClick={() => addInputField('Email')} color="primary"><AddIcon /></IconButton>

            {formData.Number.map((number, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                  <TextField
                      fullWidth label={`Number ${index + 1}`} value={number}
                      onChange={(e) => handleInputChange(index, 'Number', e.target.value)}
                      error={!!errors.Number?.[index]} helperText={errors.Number?.[index]} margin="normal"
                  />
                </Box>
            ))}
            <IconButton onClick={() => addInputField('Number')} color="primary"><AddIcon /></IconButton>

            <Button
                type="submit"
                fullWidth variant="contained" color="primary"
                disabled={hasErrors()} sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Container>
  );
};

export default RegistrationForm;

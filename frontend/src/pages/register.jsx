import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Paper, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    LastName: '',
    Address: '',
    City: '',
    Country: '',
    Email: [''], // Array to store multiple email inputs
    Number: [''] // Array to store multiple number inputs
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Name, LastName, Address, City, Country, Email, Number } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate emails
    for (const email of Email) {
      if (!emailRegex.test(email)) {
        alert(`Invalid email: ${email}`);
        return;
      }
    }

    // Validate phone numbers
    for (const number of Number) {
      if (!/^\+\d{10,}$/.test(number)) {
        alert(`Invalid phone number: ${number}. Must start with '+' and be at least 10 digits long.`);
        return;
      }
    }


    try {
      const res = await axios.post("http://localhost:3001/api/registerRoutes/register", {
        Name,
        LastName,
        Address,
        City,
        Country,
        Emails: Email, 
        Numbers: Number 
      });

      console.log("Success:", res.data);
      // alert("Registration successful!");
      navigate('/'); 
    } catch (error) {
      console.error("Error:", error.response?.data || "Error during registration");
      alert("Registration failed: " + (error.response?.data.error || "Server error"));
    }
  };

  const addInputField = (type) => {
    setFormData(prevState => ({
      ...prevState,
      [type]: [...prevState[type], '']
    }));
  };

  const handleInputChange = (index, type, value) => {
    const newValues = [...formData[type]]; 
    newValues[index] = value; 
    setFormData(prevState => ({
      ...prevState,
      [type]: newValues 
    }));
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
        <Typography variant="h4" component="h3" gutterBottom>
          PhoneBook
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="City"
            name="City"
            value={formData.City}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Country"
            name="Country"
            value={formData.Country}
            onChange={handleChange}
            margin="normal"
          />

          {formData.Email.map((email, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label={`Email ${index + 1}`}
                name={`Email-${index}`}
                value={email}
                onChange={(e) => handleInputChange(index, 'Email', e.target.value)}
                margin="normal"
              />
            </Box>
          ))}
          <IconButton onClick={() => addInputField('Email')} color="primary">
            <AddIcon />
          </IconButton>

          {formData.Number.map((number, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label={`Number ${index + 1}`}
                name={`Number-${index}`}
                value={number}
                onChange={(e) => handleInputChange(index, 'Number', e.target.value)}
                margin="normal"
              />
            </Box>
          ))}
          <IconButton onClick={() => addInputField('Number')} color="primary">
            <AddIcon />
          </IconButton>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegistrationForm;

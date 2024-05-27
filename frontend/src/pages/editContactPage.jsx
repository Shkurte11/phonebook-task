import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useParams, useNavigate } from 'react-router-dom';

const EditContactPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    LastName: '',
    Address: '',
    City: '',
    Country: '',
    emails: [''],
    phone_numbers: ['']
  });

  useEffect(() => {
    // Fetch contact details to edit
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/editRoutes/${id}`);
        const contact = response.data;

        console.log('Fetched contact:', contact);

        // Ensure emails and phone_numbers are arrays
        const emails = contact.emails ? contact.emails.split(',') : [''];
        const phone_numbers = contact.phone_numbers ? contact.phone_numbers.split(',') : [''];

        setFormData({
          Name: contact.Name || '',
          LastName: contact.LastName || '',
          Address: contact.Address || '',
          City: contact.City || '',
          Country: contact.Country || '',
          emails,
          phone_numbers
        });
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    };

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...formData.emails];
    newEmails[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      emails: newEmails
    }));
  };

  const handlePhoneNumberChange = (index, value) => {
    const newPhoneNumbers = [...formData.phone_numbers];
    newPhoneNumbers[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      phone_numbers: newPhoneNumbers
    }));
  };

  const handleAddEmail = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      emails: [...prevFormData.emails, '']
    }));
  };

  const handleAddPhoneNumber = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phone_numbers: [...prevFormData.phone_numbers, '']
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/api/updateRoutes/${id}`, formData);
      console.log('Update contact:', formData);
      navigate('/'); 
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Contact
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="Name"
          label="Name"
          value={formData.Name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="LastName"
          label="Last Name"
          value={formData.LastName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="Address"
          label="Address"
          value={formData.Address}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="City"
          label="City"
          value={formData.City}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="Country"
          label="Country"
          value={formData.Country}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        {formData.emails.map((email, index) => (
          <TextField
            key={index}
            label={`Email ${index + 1}`}
            value={email}
            onChange={(e) => handleEmailChange(index, e.target.value)}
            fullWidth
            required
            margin="normal"
          />
        ))}
        <IconButton onClick={handleAddEmail} color="primary">
          <AddIcon />
        </IconButton>
        {formData.phone_numbers.map((number, index) => (
          <TextField
            key={index}
            label={`Phone Number ${index + 1}`}
            type="tel"
            value={number}
            onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
            fullWidth
            required
            margin="normal"
          />
        ))}
        <IconButton onClick={handleAddPhoneNumber} color="primary">
          <AddIcon />
        </IconButton>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save
        </Button>
      </form>
    </Container>
  );
};

export default EditContactPage;

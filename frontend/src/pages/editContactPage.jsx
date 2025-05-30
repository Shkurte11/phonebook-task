import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, TextField, Button, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useParams, useNavigate } from 'react-router-dom';

const EditContactPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: '', LastName: '', Address: '', City: '', Country: '',
    emails: [''], phone_numbers: ['']
  });

  const [errors, setErrors] = useState({
    Name: '', LastName: '', emails: [''], phone_numbers: ['']
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/api/editRoutes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const contact = response.data;
        const emails = contact.emails ? contact.emails.split(',') : [''];
        const phone_numbers = contact.phone_numbers ? contact.phone_numbers.split(',') : [''];

        setFormData({
          Name: contact.Name || '', LastName: contact.LastName || '',
          Address: contact.Address || '', City: contact.City || '',
          Country: contact.Country || '', emails, phone_numbers
        });
        setErrors({
          Name: '', LastName: '',
          emails: emails.map(() => ''), phone_numbers: phone_numbers.map(() => '')
        });
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    };

    fetchContact();
  }, [id]);

  const validateText = (value, label) => {
    if (value.length < 2) return `${label} must be at least 2 characters`;
    if (/[^a-zA-Z\s]/.test(value)) return `${label} cannot contain symbols`;
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'Name' || name === 'LastName') {
      setErrors(prev => ({ ...prev, [name]: validateText(value, name) }));
    }
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...formData.emails];
    const newErrors = [...errors.emails];
    newEmails[index] = value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    newErrors[index] = emailRegex.test(value) ? '' : 'Invalid email';
    setFormData(prev => ({ ...prev, emails: newEmails }));
    setErrors(prev => ({ ...prev, emails: newErrors }));
  };

  const handlePhoneNumberChange = (index, value) => {
    const newPhones = [...formData.phone_numbers];
    const newErrors = [...errors.phone_numbers];
    newPhones[index] = value;
    newErrors[index] = /^\+\d{10,}$/.test(value) ? '' : 'Invalid phone number';
    setFormData(prev => ({ ...prev, phone_numbers: newPhones }));
    setErrors(prev => ({ ...prev, phone_numbers: newErrors }));
  };

  const handleAddEmail = () => {
    setFormData(prev => ({ ...prev, emails: [...prev.emails, ''] }));
    setErrors(prev => ({ ...prev, emails: [...prev.emails, 'Required'] }));
  };

  const handleAddPhoneNumber = () => {
    setFormData(prev => ({ ...prev, phone_numbers: [...prev.phone_numbers, ''] }));
    setErrors(prev => ({ ...prev, phone_numbers: [...prev.phone_numbers, 'Required'] }));
  };

  const hasErrors = () => {
    const flatErrors = Object.values(errors).flat();
    return flatErrors.some(err => err !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasErrors()) {
      alert('Fix validation errors first');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3001/api/updateRoutes/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>Edit Contact</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
              name="Name" label="Name" value={formData.Name} onChange={handleChange}
              fullWidth required margin="normal" error={!!errors.Name} helperText={errors.Name}
          />
          <TextField
              name="LastName" label="Last Name" value={formData.LastName} onChange={handleChange}
              fullWidth required margin="normal" error={!!errors.LastName} helperText={errors.LastName}
          />
          <TextField
              name="Address" label="Address" value={formData.Address}
              onChange={handleChange} fullWidth required margin="normal"
          />
          <TextField
              name="City" label="City" value={formData.City}
              onChange={handleChange} fullWidth required margin="normal"
          />
          <TextField
              name="Country" label="Country" value={formData.Country}
              onChange={handleChange} fullWidth required margin="normal"
          />
          {formData.emails.map((email, index) => (
              <TextField
                  key={index} label={`Email ${index + 1}`} value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  fullWidth required margin="normal"
                  error={!!errors.emails[index]} helperText={errors.emails[index]}
              />
          ))}
          <IconButton onClick={handleAddEmail} color="primary"><AddIcon /></IconButton>
          {formData.phone_numbers.map((number, index) => (
              <TextField
                  key={index} label={`Phone Number ${index + 1}`} value={number} type="tel"
                  onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                  fullWidth required margin="normal"
                  error={!!errors.phone_numbers[index]} helperText={errors.phone_numbers[index]}
              />
          ))}
          <IconButton onClick={handleAddPhoneNumber} color="primary"><AddIcon /></IconButton>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={hasErrors()}>
            Save
          </Button>
        </form>
      </Container>
  );
};

export default EditContactPage;

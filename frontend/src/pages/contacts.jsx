import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await axios.get('http://localhost:3001/api/contactRoutes/contacts');
       
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }

    fetchContacts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/deleteRoutes/${id}`);
      setContacts(contacts.filter(contact => contact.idregister !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleNewContact = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact List
      </Typography>
      <TableContainer component={Card} sx={{ maxHeight: '70vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell>Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts && contacts.length > 0 ? (
              contacts.map((contact) => (
                <TableRow key={contact.idregister}>
                  <TableCell>{contact.Name}</TableCell>
                  <TableCell>{contact.LastName}</TableCell>
                  <TableCell>{contact.Address}</TableCell>
                  <TableCell>{contact.City}</TableCell>
                  <TableCell>{contact.Country}</TableCell>
                  <TableCell>
                    {contact.emails ? contact.emails.split(',').map((email, index) => (
                      <div key={index}>{email}</div>
                    )) : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {contact.phone_numbers ? contact.phone_numbers.split(',').map((number, index) => (
                      <div key={index}>{number}</div>
                    )) : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(contact.idregister)} variant="contained" color="primary">Edit</Button>
                    <Button onClick={() => handleDelete(contact.idregister)} variant="contained" color="error" sx={{ ml: 1 }}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8}>No contacts found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleNewContact} sx={{ mt: 2 }}>Add New Contact</Button>
    </Container>
  );
}

export default Contacts;
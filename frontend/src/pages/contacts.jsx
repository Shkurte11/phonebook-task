import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Star, StarBorder } from '@mui/icons-material';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchContacts() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3001/api/contactRoutes/contacts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }

    fetchContacts();
  }, []);

  const handleEdit = (id) => navigate(`/edit/${id}`);
  const handleNewContact = () => navigate("/register");

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3001/api/deleteRoutes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts(contacts.filter(contact => contact.idregister !== id));
      setFavorites(favorites.filter(fid => fid !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites(prev =>
        prev.includes(id)
            ? prev.filter(fid => fid !== id)
            : [...prev, id]
    );
  };

  const filteredContacts = contacts.filter(contact => {
    const values = [
      contact.Name,
      contact.LastName,
      contact.emails?.replaceAll(',', ' ')
    ].join(' ').toLowerCase();
    return values.includes(searchTerm.toLowerCase());
  });

  return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>Contact List</Typography>

        <TextField
            fullWidth
            placeholder="Search by name, last name, or email..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
        />

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
                <TableCell>Favorite</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                      <TableRow key={contact.idregister}>
                        <TableCell>{contact.Name}</TableCell>
                        <TableCell>{contact.LastName}</TableCell>
                        <TableCell>{contact.Address}</TableCell>
                        <TableCell>{contact.City}</TableCell>
                        <TableCell>{contact.Country}</TableCell>
                        <TableCell>
                          {contact.emails?.split(',').map((email, index) => (
                              <div key={index}>{email}</div>
                          ))}
                        </TableCell>
                        <TableCell>
                          {contact.phone_numbers?.split(',').map((number, index) => (
                              <div key={index}>{number}</div>
                          ))}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => toggleFavorite(contact.idregister)} color="warning">
                            {favorites.includes(contact.idregister) ? <Star /> : <StarBorder />}
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => handleEdit(contact.idregister)} variant="contained" color="primary">Edit</Button>
                          <Button onClick={() => handleDelete(contact.idregister)} variant="contained" color="error" sx={{ ml: 1 }}>Delete</Button>
                        </TableCell>
                      </TableRow>
                  ))
              ) : (
                  <TableRow>
                    <TableCell colSpan={9}>No contacts found</TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant="contained" color="primary" onClick={handleNewContact} sx={{ mt: 2 }}>
          Add New Contact
        </Button>

        {/* ⭐ Favorite Contacts Table */}
        {favorites.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 5, mb: 2 }}>⭐ Favorite Contacts</Typography>
              <TableContainer component={Card}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Number</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contacts
                        .filter(c => favorites.includes(c.idregister))
                        .map((contact) => (
                            <TableRow key={contact.idregister}>
                              <TableCell>{contact.Name}</TableCell>
                              <TableCell>{contact.LastName}</TableCell>
                              <TableCell>{contact.emails?.split(',').map((e, i) => <div key={i}>{e}</div>)}</TableCell>
                              <TableCell>{contact.phone_numbers?.split(',').map((n, i) => <div key={i}>{n}</div>)}</TableCell>
                            </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
        )}
      </Container>
  );
}

export default Contacts;

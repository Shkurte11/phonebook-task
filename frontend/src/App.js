import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Contacts from './pages/contacts';
import EditContactPage from './pages/editContactPage'; 

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Contacts />} />
      <Route path="/edit/:id" element={<EditContactPage />} /> {}
    </Routes>
  );
}

export default App;

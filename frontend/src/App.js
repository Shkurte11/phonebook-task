import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Contacts from './pages/contacts';
import EditContactPage from './pages/editContactPage';
import SignUp from './pages/sign-up';
import Login from './pages/sign-in';
import PrivateRoute from "./components/auth/PrivateRoute.tsx";


function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />

            {/* Protected Routes */}
            <Route path="/" element={
                <PrivateRoute>
                    <Contacts />
                </PrivateRoute>
            } />

            <Route path="/register" element={
                <PrivateRoute>
                    <Register />
                </PrivateRoute>
            } />

            <Route path="/edit/:id" element={
                <PrivateRoute>
                    <EditContactPage />
                </PrivateRoute>
            } />
        </Routes>
    );
}

export default App;

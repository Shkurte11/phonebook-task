import { query } from 'express';
import { db } from '../db.js';


export const showAllContacts = async (req, res) => {
    try {
        const connection = await db();
        const query = `
            SELECT 
                r.idregister,
                r.Name,
                r.LastName,
                r.Address,
                r.City,
                r.Country,
                GROUP_CONCAT(DISTINCT e.email SEPARATOR ',') as emails,
                GROUP_CONCAT(DISTINCT p.phone_number SEPARATOR ',') as phone_numbers
            FROM 
                register r
            LEFT JOIN 
                email_addresses e ON r.idregister = e.idregister
            LEFT JOIN 
                phone_numbers p ON r.idregister = p.idregister
            GROUP BY
                r.idregister, r.Name, r.LastName, r.Address, r.City, r.Country;
        `;

        const [results] = await connection.query(query); 
        await connection.end();

        // Check if any rows were returned
        if (results.length > 0) {
            res.json(results); 
        } else {
            res.json([]); // If no rows were returned, send an empty response
        }
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Error fetching contacts' }); 
    }
};



export const getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await db(); 
        const query = `
            SELECT 
                r.idregister,
                r.Name,
                r.LastName,
                r.Address,
                r.City,
                r.Country,
                GROUP_CONCAT(DISTINCT e.email) AS emails,
                GROUP_CONCAT(DISTINCT p.phone_number) AS phone_numbers
            FROM 
                register r
            LEFT JOIN 
                email_addresses e ON r.idregister = e.idregister
            LEFT JOIN 
                phone_numbers p ON r.idregister = p.idregister
            WHERE 
                r.idregister = ?
            GROUP BY
                r.idregister, r.Name, r.LastName, r.Address, r.City, r.Country`;

        const [results] = await connection.query(query, [id]);
        await connection.end();
        console.log(results,"ressssssssss");

        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({ error: 'Error fetching contact' });
    }
};


export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, LastName, Address, City, Country, emails, phone_numbers } = req.body;

        const connection = await db(); 

        // Update the main contact details
        const updatedContactData = { Name, LastName, Address, City, Country };
        await connection.query('UPDATE register SET ? WHERE idregister = ?', [updatedContactData, id]);

        // Update emails - assuming email_addresses table has columns: idemail, register_id, email
        if (emails && emails.length > 0) {
            await connection.query('DELETE FROM email_addresses WHERE idregister = ?', [id]); // Clear existing emails
            const emailInserts = emails.map(email => [id, email]);
            await connection.query('INSERT INTO email_addresses (idregister, email) VALUES ?', [emailInserts]);
        }

        // Update phone numbers - assuming phone_numbers table has columns: idphone, register_id, phone_number
        if (phone_numbers && phone_numbers.length > 0) {
            await connection.query('DELETE FROM phone_numbers WHERE idregister = ?', [id]); // Clear existing phone numbers
            const phoneInserts = phone_numbers.map(number => [id, number]);
            await connection.query('INSERT INTO phone_numbers (idregister, phone_number) VALUES ?', [phoneInserts]);
        }

        await connection.end(); 
        
        res.json({ message: "Contact updated successfully" });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ error: 'Error updating contact' });
    }
};




export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
       

        const connection = await db(); 
        await connection.query(`DELETE FROM register WHERE idregister = ${id}`); 
        await connection.end();

        res.json({ message: "Contact updated successfully" });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ error: 'Error updating contact' });
    }
};
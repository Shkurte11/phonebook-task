export const createContact = async (req, res) => {
    const { Name, LastName, Address, City, Country, Emails, Numbers } = req.body;
    let connection;

    try {
        connection = await db();
        await connection.beginTransaction();

        const [result] = await connection.query(
            'INSERT INTO register (Name, LastName, Address, City, Country) VALUES (?, ?, ?, ?, ?)',
            [Name, LastName, Address, City, Country]
        );
        const registerId = result.insertId;

        if (Emails && Emails.length > 0) {
            const emailQueries = Emails.map(email =>
                connection.query('INSERT INTO email_addresses (idregister, email) VALUES (?, ?)', [registerId, email])
            );
            await Promise.all(emailQueries);
        }

        if (Numbers && Numbers.length > 0) {
            const phoneQueries = Numbers.map(number =>
                connection.query('INSERT INTO phone_numbers (idregister, phone_number) VALUES (?, ?)', [registerId, number])
            );
            await Promise.all(phoneQueries);
        }

        await connection.commit();
        await connection.end();

        res.status(201).json({ message: 'Contact created successfully' });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Error creating contact:', error);
        res.status(500).json({ message: 'Error creating contact' });
    }
};

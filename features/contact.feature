Scenario: User adds a valid contact
Given the user is on the Add Contact page
When the user enters valid name, phone, and email
And clicks the Register button
Then the new contact appears in the contact list

Scenario: User adds a contact with invalid phone
Given the user is on the Add Contact page
When the user enters a phone number without "+"
And clicks the Register button
Then an error message is shown for phone number

Scenario: User edits an existing contact
Given a contact exists in the list
When the user clicks Edit and updates the name
And clicks Save
Then the updated name appears in the list

Scenario: User deletes a contact
Given a contact exists in the list
When the user clicks Delete
Then the contact is removed from the list

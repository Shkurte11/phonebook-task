Scenario: User searches by name
Given contacts are displayed
When the user types a name in the search bar
Then only matching contacts are shown

Scenario: User searches by email
Given contacts are displayed
When the user types part of an email in the search bar
Then only contacts with that email are shown

Scenario: User marks a contact as favorite
Given a contact exists in the list
When the user clicks the star icon
Then the contact appears in the favorites section

Scenario: User views only favorites
Given at least one contact is favorited
Then it is shown in the Favorite Contacts table

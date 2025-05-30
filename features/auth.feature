Scenario: User registers with valid credentials
Given the user is on the registration page
When the user enters a valid email and password
And clicks the Sign Up button
Then the user is redirected to the login page

Scenario: User registers with an invalid email
Given the user is on the registration page
When the user enters "invalid_email" as email
And clicks the Sign Up button
Then an error message "Invalid email" is shown

Scenario: User logs in with valid credentials
Given the user is on the login page
When the user enters correct email and password
And clicks the Login button
Then the user is redirected to the contacts page

Scenario: User fails login with wrong password
Given the user is on the login page
When the user enters correct email and wrong password
And clicks the Login button
Then an error message "Login failed" is shown

import { addContactTest } from './addContact.test.mjs';
import { deleteContactTest } from './deleteContact.test.js';
import { editContactTest } from './editContact.test.js';
import { favoriteContactTest } from './favoriteContact.test.js';
import { invalidPhoneContactTest } from './invalidPhoneContact.test.js';
import { loginTest } from './login.test.js';
import { invalidLoginTest } from './loginInvalid.test.js';
import { missingFieldSubmitTest } from './missingFieldSubmit.test.js';
import { passwordBoundaryTest } from './passwordBoundary.test.js';
import { registerTest } from './register.test.js';
import { responsiveLayoutTest } from './responsiveLayout.test.js';
import { searchContactTest } from './searchContact.test.js';

const tests = [

    { name: 'Add Contact', fn: addContactTest },
    { name: 'Delete Contact', fn: deleteContactTest },
    // { name: 'Edit Contact', fn: editContactTest },
    // { name: 'Favorite Contact', fn: favoriteContactTest },
    // { name: 'Invalid Phone Number', fn: invalidPhoneContactTest },
    // { name: 'Login', fn: loginTest },
    // { name: 'Login Invalid', fn: invalidLoginTest },
    // { name: 'Missing Field Submit', fn: missingFieldSubmitTest },
    // { name: 'Password Boundary', fn: passwordBoundaryTest },
    // { name: 'Register', fn: registerTest },
    // { name: 'Responsive Layout', fn: responsiveLayoutTest },
    // { name: 'Search Contact', fn: searchContactTest }
];

for (const test of tests) {
    console.log(`\n▶ Running ${test.name}.test.js`);
    try {
        await test.fn();
        console.log(`✅ ${test.name} test passed`);
    } catch (err) {
        console.error(`❌ ${test.name} test failed:`, err.message);
    }
}

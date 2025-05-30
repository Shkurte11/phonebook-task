import { Builder, By, until } from 'selenium-webdriver';
import edge from 'selenium-webdriver/edge.js';

export async function addContactTest() {
    console.log('Test started');

    const driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeOptions(new edge.Options().addArguments('--headless=new'))
        .build();

    try {
        console.log('Edge started');

        await driver.get('http://localhost:3000/login');
        console.log('Navigated to login');

        await driver.findElement(By.name('email')).sendKeys('test@example.com');
        await driver.findElement(By.name('password')).sendKeys('password123');
        await driver.findElement(By.css('button[type="submit"]')).click();

        await driver.wait(until.urlIs('http://localhost:3000/'), 5000);
        console.log('Logged in successfully');

        await driver.get('http://localhost:3000/register');
        console.log('Navigated to /register');

        await driver.findElement(By.name('Name')).sendKeys('John');
        await driver.findElement(By.name('LastName')).sendKeys('Doe');
        await driver.findElement(By.name('Address')).sendKeys('123 Main St');
        await driver.findElement(By.name('City')).sendKeys('New York');
        await driver.findElement(By.name('Country')).sendKeys('USA');
        await driver.findElement(By.name('Email-0')).sendKeys('john.doe@example.com');
        await driver.findElement(By.name('Number-0')).sendKeys('+12345678901');

        await driver.findElement(By.css('button[type="submit"]')).click();
        await driver.wait(until.urlIs('http://localhost:3000/'), 5000);
        console.log(' Add contact test passed');

    } catch (err) {
        console.error('Add contact test failed:', err);
    } finally {
        await driver.quit();
    }
}

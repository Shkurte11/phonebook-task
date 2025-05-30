import { Builder, By, until } from 'selenium-webdriver';
import edge from "selenium-webdriver/edge.js";
export async function invalidPhoneContactTest() {
    const driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeOptions(new edge.Options().addArguments('--headless=new'))
    try {
        await driver.get('http://localhost:3000/login');
        await driver.findElement(By.name('email')).sendKeys('test@example.com');
        await driver.findElement(By.name('password')).sendKeys('password123');
        await driver.findElement(By.css('button')).click();
        await driver.wait(until.urlIs('http://localhost:3000/'), 5000);

        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.name('Name')).sendKeys('Invalid');
        await driver.findElement(By.name('LastName')).sendKeys('Phone');
        await driver.findElement(By.name('Address')).sendKeys('Error St');
        await driver.findElement(By.name('City')).sendKeys('Nowhere');
        await driver.findElement(By.name('Country')).sendKeys('None');
        await driver.findElement(By.name('Email-0')).sendKeys('invalid@example.com');
        await driver.findElement(By.name('Number-0')).sendKeys('12345'); // No + prefix
        await driver.findElement(By.css('button[type="submit"]')).click();

        await driver.wait(until.alertIsPresent(), 3000);
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        if (!alertText.toLowerCase().includes('invalid')) {
            throw new Error('Expected alert about invalid phone number');
        }
        await alert.accept();
        console.log(' Invalid phone number test passed');
    } catch (err) {
        console.error(' Invalid phone number test failed:', err);
    } finally {
        await driver.quit();
    }
};

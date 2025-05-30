import { Builder, By, until } from 'selenium-webdriver';
import edge from "selenium-webdriver/edge.js";
export async function registerTest() {
    const driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeOptions(new edge.Options().addArguments('--headless=new'))
    try {
        await driver.get('http://localhost:3000/sign-up');
        await driver.findElement(By.name('email')).sendKeys('newuser@example.com');
        await driver.findElement(By.name('password')).sendKeys('securePass123');
        await driver.findElement(By.name('confirmPassword')).sendKeys('securePass123');
        await driver.findElement(By.css('button')).click();
        await driver.wait(until.urlContains('/login'), 5000);
        console.log('Register test passed');
    } catch (err) {
        console.error('Register test failed:', err);
    } finally {
        await driver.quit();
    }
};

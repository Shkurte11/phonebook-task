import { Builder, By, until } from 'selenium-webdriver';
import edge from "selenium-webdriver/edge.js";
export async function missingFieldSubmitTest() {
    const driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeOptions(new edge.Options().addArguments('--headless=new'))
        .build();
    try {
        await driver.get('http://localhost:3000/login');
        await driver.findElement(By.name('email')).sendKeys('test@example.com');
        await driver.findElement(By.name('password')).sendKeys('password123');
        await driver.findElement(By.css('button')).click();
        await driver.wait(until.urlIs('http://localhost:3000/'), 5000);

        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.name('Name')).sendKeys('OnlyName');
        await driver.findElement(By.css('button[type="submit"]')).click();

        await driver.wait(until.alertIsPresent(), 3000);
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        if (!alertText.toLowerCase().includes('required') && !alertText.toLowerCase().includes('missing')) {
            throw new Error('Expected alert about missing fields');
        }
        await alert.accept();
        console.log(' Missing field submit test passed');
    } catch (err) {
        console.error(' Missing field submit test failed:', err);
    } finally {
        await driver.quit();
    }
};

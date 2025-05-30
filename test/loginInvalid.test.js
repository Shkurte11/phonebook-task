import { Builder, By, until } from 'selenium-webdriver';
import edge from "selenium-webdriver/edge.js";

export async function invalidLoginTest() {
    const driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeOptions(new edge.Options().addArguments('--headless=new'))
        .build();
    try {
        await driver.get('http://localhost:3000/login');
        await driver.findElement(By.name('email')).sendKeys('wrong@example.com');
        await driver.findElement(By.name('password')).sendKeys('wrongpass');
        await driver.findElement(By.css('button')).click();
        await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Login failed') or contains(text(), 'Invalid')]")), 5000);
        console.log(' Invalid login test passed');
    } catch (err) {
        console.error(' Invalid login test failed:', err);
    } finally {
        await driver.quit();
    }
};

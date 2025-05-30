import { Builder, By, until } from 'selenium-webdriver';
import edge from "selenium-webdriver/edge.js";

export async function loginTest() {
    const driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeOptions(new edge.Options().addArguments('--headless=new'))
        .build();
    try {
        await driver.get('http://localhost:3000/login');
        await driver.findElement(By.name('email')).sendKeys('test@example.com');
        await driver.findElement(By.name('password')).sendKeys('password123');
        await driver.findElement(By.css('button')).click();
        await driver.wait(until.urlContains('/'), 5000);
        console.log(' Login test passed');
    } catch (err) {
        console.error(' Login test failed:', err);
    } finally {
        await driver.quit();
    }
};

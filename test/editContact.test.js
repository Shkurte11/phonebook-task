import { Builder, By, until } from 'selenium-webdriver';
import edge from "selenium-webdriver/edge.js";

export async function editContactTest() {
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

        await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Edit')]")), 5000);
        await driver.findElement(By.xpath("//button[contains(text(), 'Edit')]")).click();

        const nameInput = await driver.findElement(By.name('Name'));
        await nameInput.clear();
        await nameInput.sendKeys('UpdatedName');

        await driver.findElement(By.css('button[type="submit"]')).click();
        await driver.wait(until.urlIs('http://localhost:3000/'), 5000);
        console.log(' Edit contact test passed');
    } catch (err) {
        console.error(' Edit contact test failed:', err);
    } finally {
        await driver.quit();
    }
};

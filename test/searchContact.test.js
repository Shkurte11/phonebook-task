import { Builder, By, until } from 'selenium-webdriver';
import edge from "selenium-webdriver/edge.js";

export async function searchContactTest() {
    const driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeOptions(new edge.Options().addArguments('--headless=new')) // Use headless Edge
        .build();
    try {
        await driver.get('http://localhost:3000/login');
        await driver.findElement(By.name('email')).sendKeys('test@example.com');
        await driver.findElement(By.name('password')).sendKeys('password123');
        await driver.findElement(By.css('button')).click();
        await driver.wait(until.urlIs('http://localhost:3000/'), 5000);

        const searchInput = await driver.findElement(By.css('input[placeholder*="Search"]'));
        await searchInput.sendKeys('Jane');

        const resultCell = await driver.wait(until.elementLocated(By.xpath("//td[contains(text(), 'Jane')]")), 5000);
        if (!resultCell) throw new Error('Expected search result not found');

        console.log('Search contact test passed');
    } catch (err) {
        console.error('Search contact test failed:', err);
    } finally {
        await driver.quit();
    }
};

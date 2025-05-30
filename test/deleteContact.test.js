import { Builder, By, until } from 'selenium-webdriver';
import edge from 'selenium-webdriver/edge.js';

export async function deleteContactTest() {
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

        const deleteButton = await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(), 'Delete')]")),
            5000
        );
        await deleteButton.click();

        await driver.sleep(1000);
        console.log(' Delete contact test passed');
    } catch (err) {
        console.error(' Delete contact test failed:', err);
    } finally {
        await driver.quit();
    }
}

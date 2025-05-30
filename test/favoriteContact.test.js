import { Builder, By, until } from 'selenium-webdriver';
import edge from "selenium-webdriver/edge.js";

export async function favoriteContactTest() {
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

        const favIcon = await driver.wait(until.elementLocated(By.css('svg[data-testid="FavoriteIcon"]')), 5000);
        await favIcon.click();

        await driver.findElement(By.xpath("//button[contains(text(), 'Favorites')]"))?.click();

        await driver.wait(until.elementLocated(By.xpath("//td[contains(text(), 'Jane')]")), 5000);
        console.log(' Favorite contact test passed');
    } catch (err) {
        console.error(' Favorite contact test failed:', err);
    } finally {
        await driver.quit();
    }
};

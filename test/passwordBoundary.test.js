import { Builder, By, until } from 'selenium-webdriver';
import edge from "selenium-webdriver/edge.js";

export async function passwordBoundaryTest() {
    const driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeOptions(new edge.Options().addArguments('--headless=new'))
        .build();
    try {
        await driver.get('http://localhost:3000/sign-up');
        await driver.findElement(By.name('email')).sendKeys('boundary@example.com');
        await driver.findElement(By.name('password')).sendKeys('short');
        await driver.findElement(By.name('confirmPassword')).sendKeys('short');
        await driver.findElement(By.css('button')).click();
        await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Password') and contains(text(), 'minimum')]")), 5000);
        console.log(' Password boundary test passed');
    } catch (err) {
        console.error('Password boundary test failed:', err);
    } finally {
        await driver.quit();
    }
};

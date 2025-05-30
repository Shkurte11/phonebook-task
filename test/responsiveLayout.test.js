import { Builder, By, until } from 'selenium-webdriver';
import edge from "selenium-webdriver/edge.js";

export async function responsiveLayoutTest() {
    const driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeOptions(new edge.Options().addArguments('--headless=new'))
        .build();
    try {
        await driver.manage().window().setRect({ width: 390, height: 844 });
        await driver.get('http://localhost:3000/login');

        const emailInput = await driver.findElement(By.name('email'));
        const passwordInput = await driver.findElement(By.name('password'));
        const loginButton = await driver.findElement(By.css('button'));

        if (!emailInput || !passwordInput || !loginButton) {
            throw new Error('Responsive layout missing form elements');
        }

        console.log('Responsive layout test passed');
    } catch (err) {
        console.error('Responsive layout test failed:', err);
    } finally {
        await driver.quit();
    }
};

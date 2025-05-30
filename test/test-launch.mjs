import { Builder } from 'selenium-webdriver';
import edge from 'selenium-webdriver/edge.js';

console.log('Test started');

const driver = await new Builder()
    .forBrowser('MicrosoftEdge')
    .setEdgeOptions(new edge.Options().addArguments('--headless=new'))
    .build();

console.log('Edge started');

await driver.get('https://example.com');
console.log('Navigated to example.com');

await driver.quit();
console.log('Done');

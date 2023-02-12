const puppeteer = require('puppeteer');

const scrapeData = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://wordfinder.yourdictionary.com/unscramble/asdfjklruei/");

    const items = await page.$$eval("td.table__cell--first", items => {
        return items.map(item => item.textContent);
    });

    console.log(items);

    browser.close();
};

scrapeData();

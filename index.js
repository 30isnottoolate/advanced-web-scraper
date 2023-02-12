const puppeteer = require('puppeteer');
const fs = require("fs");

const scrapeData = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://word.tips/unscramble/asdfjkl/");

    const items = await page.$$eval(".p-1.m-1", items => {
        return items.map(item => item.firstChild.textContent);
    });

    fs.writeFile("scraped-data.json", JSON.stringify(items, null, 4), (error) => {
        if (error) {
            console.error(error);
            return;
        }

        console.log("Data scraped");
    });
    browser.close();
};

scrapeData();

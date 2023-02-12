const puppeteer = require('puppeteer');
const fs = require("fs");

const scrapeData = async (targetUrl, targetElement) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(targetUrl);

        /* const items = await page.$$eval(targetElement, items => {
            return items.map(item => item.firstChild.textContent);
        }); */

        const items = await page.evaluate(() => {
            const nodeList  = document.querySelectorAll(".p-1.m-1");

            return Array.from(nodeList).map(item => item.firstChild.textContent);
        });

        fs.writeFile("scraped-data.json", JSON.stringify(items, null, 4), (error) => {
            if (error) {
                console.error(error);
                return;
            }

            console.log("Data scraped");
        });

        browser.close();

    } 

    catch (error) {
        console.error(error);
    }
};

scrapeData("https://word.tips/unscramble/asdfjklqwer/", ".p-1.m-1");

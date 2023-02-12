const puppeteer = require('puppeteer');
const fs = require("fs");

const urls = [
    "https://word.tips/unscramble/asdfjkl/",
    "https://word.tips/unscramble/asdfjklru/",
    "https://word.tips/unscramble/asdfjklruei/",
    "https://word.tips/unscramble/asdfjklrueiwo/",
    "https://word.tips/unscramble/asdfjklrueiwoqp/",
    "https://word.tips/unscramble/asdfjkleigh/",
    "https://word.tips/unscramble/asdfjkleighty/",
    "https://word.tips/unscramble/asdfjkleightyvm/",
    "https://word.tips/unscramble/asdfjkleivmbn/",
    "https://word.tips/unscramble/asdfjkleivmbnc/",
    "https://word.tips/unscramble/asdfjkleivmczx/",
];

const scrapeData = async (targetUrl, targetElement, outputFile) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(targetUrl);

        await page.waitForSelector(targetElement, {timeout: 5000})
            .then(() => console.log("Target(s) found"))
            .catch(() => console.log("Target(s) not found"));

        const items = await page.evaluate((targetElement) => {
            const nodeList = document.querySelectorAll(targetElement);

            return Array.from(nodeList).map(item => item.firstChild.textContent);
        }, targetElement);

        items.length > 0 && console.log(`Number of targets: ${items.length}`);

        if (items.length > 0) {
            fs.writeFile(outputFile, JSON.stringify(items, null, 4), (error) => {
                if (error) {
                    console.error(error);
                    return;
                }
    
                console.log("Data scraping successful");
            });

        } else console.log("Data scraping failed");
        
        browser.close();
    }

    catch (error) {
        console.error(error);
    }
};

urls.forEach((item, index) => {
    scrapeData(item, "span.p-1.m-1", `data/scraped-data-${index}.json`);
});

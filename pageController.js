const pageScraper = require('./pageScraper');

// Connects the browser instcance with the main page scraper
// This code exports a function that takes in the browser instance and passes it to a function called 
// scrapeAll(). This function, in turn, passes this instance to pageScraper.scraper() as an argument 
// which uses it to scrape pages.

async function scrapeAll(browserInstance, searchTerm){
    let browser;
    try{
        browser = await browserInstance;
        
        //Main scraping functionality
        await pageScraper.scraper(browser, searchTerm);

    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance, searchTerm) => scrapeAll(browserInstance, searchTerm)
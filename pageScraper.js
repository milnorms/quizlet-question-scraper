// create an object literal with a url property and a scraper() method. 
// The url is the web URL of the web page you want to scrape, while the scraper() 
// method contains the code that will perform your actual scraping, although at this 
// stage it merely navigates to a URL
// Guide: https://www.digitalocean.com/community/tutorials/how-to-scrape-a-website-using-node-js-and-puppeteer#prerequisites

const { findClosestMatch, sanitizeText } = require('./textFunctions');
const tf = require('./textFunctions');

const scraperObject = {
    url: 'https://www.google.com/',
    async scraper(browser, searchTerm){
        try {
            let page = await browser.newPage();

            console.log(`Navigating to ${this.url}...`);
            // Goto google
            await page.goto(this.url);
    
            // Find google's search form selector
            await page.type('input.gsfi', `site:quizlet.com ${searchTerm}`);
            await page.keyboard.press('Enter');
            console.log(`Searching for => ${searchTerm}`);
    
            // Going to results page
            await page.waitForNavigation();
            console.log(`Navigating to ${page.url()}...`);
    
            let links = [];
            let desc = [];
            links = await page.$$eval('div.g > div.rc > div:first-child > a', el => el.map(el => el.href));
            desc = await page.$$eval('div.g > div.rc > div.IsZvec > div > span', el => el.map(el => el.textContent));
    
            // Amount of links we want to look at
            const resultAmt = 4;
    
            let results = [];
    
            for (let i = 0; i < resultAmt; i++) {
                let r = {links: '', desc: ''};
                r.links = links[i];
                r.desc = desc[i];
                results.push(r);
            }
            
            // console.log(results);

            // Finding the closest google result
            searchTerm = sanitizeText(searchTerm);
            let chosenResult = findClosestMatch(searchTerm, results);

            //Go to chosen result link
            await page.goto(chosenResult);
            console.log(`Navigating to ${chosenResult}...`);

            // Scrape quizlet

            // Check word text (left) for match, if found, get corresponding def
            // If not found, check other side
            let wordText = [];
            let defText = [];

            wordText = await page.$$eval('a.SetPageTerm-wordText > span.TermText', el => el.map(el => el.textContent));
            defText = await page.$$eval('a.SetPageTerm-definitionText > span.TermText', el => el.map(el => el.textContent));
            // console.log(wordText.length, defText.length);

            // console.log(searchTerm);

            let matchIndex = 0;
            let match = false;
            let wordTextMatch = false;

            // First check every wordText (left side)
            for (let i = 0; i < wordText.length; i++) {
                let wt = sanitizeText(wordText[i]);
                let r = new RegExp(searchTerm, 'gi');
               if (wt.match(r)) {
                match = true;
                wordTextMatch = true;
                // console.log(wt.match(r));
                matchIndex = i;
               }
                
            }

            // If the question isnt found on wordText, check defText(right)
            if (match == false) {

            for (let i = 0; i < defText.length; i++) {
                let dt = sanitizeText(defText[i]);
                let r = new RegExp(searchTerm, 'gi');
                if (dt.match(r)) {
                match = true;
                // console.log(dt.match(r));
                matchIndex = i;
                }
                
                }
            }

            if (match) {
                // If question matched on word side, answer is on def side
                // Printing out answer in cyan
                if (wordTextMatch) {
                    console.log('\x1b[36m%s\x1b[0m', defText[matchIndex]);
                } else {
                    console.log('\x1b[36m%s\x1b[0m', wordText[matchIndex]);
                }
    
            }
            else {
                console.log('\x1b[33m%s\x1b[0m', 'No match found :(')
            }
    
            await browser.close();
            
        } catch (err) {
            console.error("Error => : ", err);
        }

    }
}

module.exports = scraperObject;


// Puppeteer has a newPage() method that creates a new page instance in the browser, 
// and these page instances can do quite a few things. In our scraper() method, you created a 
// page instance and then used the page.goto() method to navigate to the books.toscrape.com homepage.
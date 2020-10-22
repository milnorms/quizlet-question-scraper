const browserObject = require('./browser');
const scraperController = require('./pageController');

// Starting browser and creating an instance
let browserInstance = browserObject.startBrowser();

// Getting question from command line arguements
let arg = process.argv.slice(2);
const searchTerm = arg.join(' ');


// const searchTerm = 'For which group of managers are conceptual skills particularly important?';
// const searchTerm = 'Shauna is a manager renowned for her​ __________ within the organization. She is incredibly talented at being able to connect with people and is​ well-trusted by her employees.'
// const searchTerm = 'Which function of management is most concerned with ensuring that employees are performing to operational​ standards?';

// Pass the browser instance to the scraper controller
scraperController(browserInstance, searchTerm);
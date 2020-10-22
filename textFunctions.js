
// let results = [
//     {
//         links: 'https://quizlet.com/234975990/chapter-7-quiz-flash-cards/',
//         desc: 'In many organizations, the human resource manager does not have authority over hiring of employees in departments ... which function of management is most concerned with ensuring that employees are performing to operational standards?'
//       },
//       {
//         links: 'https://quizlet.com/371507037/chapters-7-10-quizzes-flash-cards/',
//         desc: 'Which function of management is most concerned with ensuring that employees are performing to operational​ standards? Controlling.'    
//       },
//       {
//         links: 'https://courses.lumenlearning.com/boundless-business/chapter/types-of-management/',
//         desc: ''
//       }
//   ];

// let searchTermFull = 'Which function of management is most concerned with ensuring that employees are performing to operational​ standards?';
// let searchTermLess = 'Which functions of management';
// let searchTermWrong = 'creme brulee is a food';

// console.log(findClosestMatch(searchTermFull, results))

// Takes in the search term and the results object as arguments
// Returns link to the closest text match of the results to the search term
function findClosestMatch (searchTerm, results) {

    

    // Least number of words that need to be matching. Adjust if needed
    // Lower == more lenient match; Higher == more specific match
    const countThreshold = 4;

    let lowestDiff = 0;
    let lowestIndex = null;
    let validMatch = false;

    // Loop through all results
    for (let i = 0; i< results.length; i++){
        let result = sanitizeText(results[i].desc);
        // Comparing our searchTerm to the google results

        let re = new RegExp(searchTerm, 'gi');

        // If the result match is exact, then we go with that link and exit out of function
        if (result.match(re) != null) {
            if (result.match(re)[0] == searchTerm) {
                console.log('The question is an exact match!');
                // Question is a perfect match, Go with this link
                return results[i].links;
            } }


        // Splitting search term into individual words to be compared to the result desc string
        words = searchTerm.split(' ');
        let count = 0;
        for (let i = 0; i < words.length; i++) {
            let r = new RegExp(words[i], 'gi');
            if (result.match(r)) {
                // console.log(result.match(r));
                count++;
            }}
        
        // If the count for word matches are less than threshold, assume the link isnt a match
        // If the first result is a match, most likely there are other matches
        if (count >= countThreshold) {
            validMatch = true;
        } 


        // String with the lowest difference of matching word counts is probably the closest match
        let countDiff = result.length - count;

        if (countDiff < lowestDiff) {
            lowestDiff = countDiff;
            lowestIndex = i;
        } else if (i == 0){
            lowestDiff = countDiff;
            lowestIndex = i;
        }
        // console.log(lowestDiff, lowestIndex); 
    }
        

        if (validMatch) {
            return results[lowestIndex].links
        } else {
            return 'No matches found'
        }
        

} 

function sanitizeText (text) {
    // Cleans up text by removing any non alphanumeric characters and converting to lowercase
    text = text.toLowerCase();
    // Take out punctuations
    text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    text = text.replace(/[^a-z0-9+]+/gi, ' ');
    return text;
}

module.exports = {
    findClosestMatch,
    sanitizeText
}

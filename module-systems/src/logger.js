function log(name){
    console.log('The name is'+name);
}
function Welcome() {
    console.log('welcome to my app. I am Sourav');
}
const url = 'http://www.google.com'
module.exports.logMessage = log
module.exports.printWelcomeMessage = Welcome
module.exports.loggerEndpoint = url
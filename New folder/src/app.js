const loggerObj = require('./logger')
const helperObj = require('.util/helper')
const formatterObj = require('..validator/formatter')

const obj = require('underscore')
const lo = require('lodash')


loggerObj.logMessage('module system')
loggerObj.printWelcomeMessage()
console.log(loggerObj.loggerEndpoint);
console.log('----------------------------------------------');
helperObj.getDate()
helperObj.getMonth()
helperObj.getBatchInfo()
console.log('------------------------------------------------');
formatterObj.trimInput()
formatterObj.changeToLowerCase()
formatterObj.changeToUpperCase()
console.log('------------------------------------------------');
console.log(obj.first(["Apple","orange","banana"]));
console.log(obj.last([12,2,3,55,45,60,50,15,]));
console.log(obj.rest(["sunday","monday","Tuesday","wednesday","Thursday","friday"]));
console.log('------------------------------------------------');

console.log(lo.chunk(["January","February","March","April","May","June","July","August","September","October","November","December"],3));

console.log(lo.tail([1,3,5,7,9,11,13,15,17,19,21,23]));

console.log(lo.union([1,2,2],[3,4,3],[4,5]));

console.log(lo.fromPairs(["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]));
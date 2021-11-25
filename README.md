#AXIOS Get request
ABOUT AXIOS- a package that helps us hit any external api and fetch data from that api

create options object with method and url

await axios(options)

data will be mostly available in response.data


Week 6 Day 4-1. What is Axios ?It is a library which is used to make requests to an API, return data from the API, and then do things with that data. It's a package of node js.Package- npm i axiosIt helps us to hit external APIs .Example –  while login to a website or application there is an option to login via google or facebook account, it means google & fb provide an specific API to that application to use into its login page , On clicking on “Continue with google” then google will send the particular user’s details/data to the application then it got accessed.Demo API to fetch all States using Axios.get  (hitting external API)Define a variable named Options . –just a convention         Try {Let options ={        Method : “get”,        Url : “https.www.xyz.com”         };const cowinStates = await axios(options);console.log(“Working fine”);Let  states = cowinStates.data; res.status(200).send({msg : “Succesfully fetched data” , data: states})}Catch(err){res.status(500).send(msg:”Error occured”)}Another example to fetch districts by the states id -  Response in postman –
 like 3

[12:53 PM] Joy bhattacharya_R7
Notes from the sessions till now.



post request:
method changed to post
data field added in options
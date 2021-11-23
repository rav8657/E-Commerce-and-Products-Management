# radium
radium
Note: Submit this assignment in a branch in your own repository by the name assignment/jwt

User Apis
POST /users (Public API)
Register a user
The details of a user are name(mandatory and unqiue), mobile(mandatory), email(mandatory), password(mandatory) and a isDeleted flag with a default false value
POST /login (Public API)
Validate credentials of the user. The credentials of a user are their name and their password. You will receive these in the request body. The credentials are valid if there exists a user with the combination of credentials. Return a true status in response body. You also have to ensure the user is valid (not deleted) . Additionally, if a valid user is found you have to create a Json Web Token using the package called 'jsonwebtoken'. The response structure for this api should be like this. Use any string as the secret. In the payload of the token provide the userId. Payload example - {userId: "619cccc58d8f480db6050233"}. Secret example - 'radium'
NOTE:
The following apis must contain a request header 'x-auth-token' containing the token returned from a successful login request
The following apis must have a validation where the request header 'x-auth-token' must be present and it should be a valid token. If this validation fails, terminate the request response cycle and return an error message accordingly. (Both the cases when a token is not present as well as when the token is not succesfully decoded)
GET /users/:userId (Protected API - token validation)
return the user's details if found else return a response with an error message having a structure like this
PUT /users/:userId (Protected API - token validation
Update a user's email recieved in the request body. Before actually updating the details ensure that the userId recieved is valid which means a valid user with this id must exist, else return a response with an error message with a structure like this
Login Response structure
{
  status: true,
  data: {
    userId: "619cccc58d8f480db6050233"
  },
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTljY2NjNThkOGY0ODBkYjYwNTAyMzMiLCJpYXQiOjE2Mzc2NjY3NTl9.MgI-kKr8CXepycqeYF8twlSrVJ-63C76q1kHSGd_iew"
}
Successful Response structure
{
  status: true,
  data: {

  }
}
Error Response structure
{
  status: false,
  msg: ""
}
Collections
Users
{
    "name" : "Sabiha",
    "mobile" : 9999999999,
    "email" : "s@gmail.com",
    "password" : "123",
    "isDeleted" : false,
}
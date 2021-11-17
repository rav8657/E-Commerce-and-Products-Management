const { application } = require('express');
const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});



//Create an endpoint for GET /movies that returns a list of movies. Define an array of movies in your code and return the value in response.
router.get('/movies', function (req, res) {
    res.send(['No Time To Die', 'Dune', 'The Suicide Squad', 'Shang-Chi And The Legend Of The Ten Rings'])
});


// Create an endpoint GET movies/indexNumber (For example GET /movies/1 is a valid request and it should return the movie in your array at index 1). You can define an array of movies again in your api

// Handle a scenario in problem 2 where if the index is greater than the valid maximum value a message is returned that tells the user to use a valid index in an error message.


router.get('/movies/:movieIndex', function (req, res) {

    let movies = [
        'No Time To Die',
        'Dune',
        'The Suicide Squad',
        'Shang-Chi And The Legend Of The Ten Rings'
    ]
    let index = req.params.movieIndex
    if (index > movies.length - 1) {
        res.send("Invalid Input")
    } else {
        res.send(movies[index])
    }

});

//Write another api called GET /films. Instead of an array of strings define an array of movie objects this time. Each movie object should have values - id, name. Return the entire array in this api’s response
let movies = [
    {
        "id": 1,
        "name": 'No Time To Die'
    },
    {
        "id": 2,
        "name": 'Dune'
    },
    {
        "id": 3,
        "name": 'The Suicide Squad'
    },
    {
        "id": 4,
        "name": 'Shang-Chi And The Legend Of The Ten Rings'
    }]

router.get('/films', function (req, res) {


    res.send(movies)
});


//Write api GET /films/:filmId where filmId is the value received in request path params. Use this value to return a movie object with this id. In case there is no such movie present in the array, return a suitable message in the response body.

router.get('/films/:filmsid', function (req, res) {

    let i = req.params.filmsid

    const films = movies.filter(x => x.id == i)
    //console.log(films);
    if (films.length == 0) {
        res.send("There is no movie with this ID")
    } else {
        res.send(films)
    }
});


//Date 11/nov/2021 assignment 
//-----------FIND MISSING NUMBER FROM CONSICUTIVE NUMBER ARRAY-----------


// -write an api which gives the missing number in an array of integers starting from 1….e.g [1,2,3,5,6,7] : 4 is missing


router.get('/missing', function (req, res) {
    let arr = [1, 2, 3, 5, 6, 7]
    let total = 0;
    for (var i in arr) {
        total = total + arr[i];
    }
    let lastDigit = arr.pop()
    let consecutiveSum = lastDigit * (lastDigit + 1) / 2
    let missingNumber = consecutiveSum - total

    res.send({ data: missingNumber });
});



// -write an api which gives the missing number in an array of integers starting from anywhere….e.g [33, 34, 35, 37, 39]
// : 36 is missing
router.get('/missingno', function (req, res) {
    let arr = [33, 34, 35, 37, 38, 39]
    let len = arr.length
    let total = 0;
    for (var i in arr) {
        total = total + arr[i];
    }
    let firstDigit = arr[0]
    let lastDigit = arr.pop()
    let consecutiveSum = (len + 1) * (firstDigit + lastDigit) / 2
    let missingNumber = consecutiveSum - total

    res.send({ data: missingNumber });
});




//class work----
router.post("/postReq1", function (req, res) {
    let arr = ["hii"]
    let Input = req.body.entry
    arr.push(Input)
    res.send({ data: arr })
});


//DATE 12/nov/2021 
//----------------PROBLEM 1---------------

// Write a GET api to fetch specific movies (path -> /specific-movies) with the help of query params - rating and genre

let arr = [
    {
        "id": 1,
        "name": 'No Time To Die',
        "rating": 8,
        "director": "Cary Joji Fukunaga",
        "genre": "Action"
    },
    {
        "id": 2,
        "name": 'Dune',
        "rating": 8,
        "director": "Denis Villeneuve",
        "genre": "Adventure fiction"
    },
    {
        "id": 3,
        "name": 'The Suicide Squad',
        "rating": 7,
        "director": "James Gunn",
        "genre": "Action"
    },
    {
        "id": 4,
        "name": 'The Legend Of The Ten Rings',
        "rating": 8,
        "director": "Destin Daniel Cretton",
        "genre": "Action"
    },
    {
        "id": 5,
        "name": 'The Shining',
        "rating": 7,
        "director": "Stanley Kubrik",
        "genre": "horror"
    }
]


router.get('/specific-movies', function (req, res) {

    const value1 = req.query.r
    const value2 = req.query.g
    const len = arr.length;

    for (let i = 0; i < len; i++) {

        if (arr[i].rating == value1 && arr[i].genre === value2) {
            res.send(arr[i]);
        }
    }
});




//----------------PROBLEM 2---------------

// Write a POST api to add a movie to the movies collection (path -> /specific-movies ). You have to make sure you provide all the details of the movie in the request at Postman (movie details must have an id, name, rating, director and genre) as well as that you return the updated array in the response


router.post("/specific-movies", function (req, res) {
    let Input = req.body.entry
    arr.push(Input)
    res.send({ data: arr })
});


//----------------PROBLEM 3---------------

// Write a GET api (path -> /best-movie) that returns only one movie that has the highest rating in the collection. In case there are multiple movies with the highest rating value, return any one out of those.


router.get("/best-movie", function (req, res) {

    // let max=arr[0].rating
    //    for(let i=0;i<arr.length;i++){
    //        if(arr[i].rating>max)
    //        max=arr[i].rating }
    //    res.status(200).json(max)


    let highestRating = 0;
    let highestRatingIndex = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].rating > highestRating) {
            highestRating = arr[i].rating;
            highestRatingIndex = i;
        }
    }
    res.send("The highest rated movie is: " + arr[highestRatingIndex].name);

});




//----------------PROBLEM 4---------------

// For this problem you don’t have to write a new api you have to update the logic in problem 2’s api. This time you must check the value of rating as well the value of director in the request. If the rating has value greater than 10, return a message in the response informing that the maximum value a rating can have is 10. If the director value is not present in the request you have to return a message in the response informing the director value must be present.


router.post("/specific-movies", function (req, res) {


    let rating = req.body.rating;
    let director = req.body.director;
    //console.log(director)
    if (!director) {
        res.send("Director information must be present in the request");
    } else if (rating > 10) {
        res.send("Rating is not valid. A valid rating value is between 1 and 10");
    } else {
        let newMovie = {
            id: req.body.id,
            name: req.body.name,
            rating: req.body.rating,
            director: req.body.director,
            genre: req.body.genre,
        };
        arr.push(newMovie);
        res.send(arr);
    }
});




//<---------------DATE 13NOV2021-------------->
//<---------------LONG ASSIGNMENT ON GET AND POST------------->

//PROBLEM 1---->Make players collection

let playerArray = []
router.post('/players', function (req, res) {
    let playerAdd = req.body
    for (let i = 0; i < playerArray.length; i++) {
        if (playerArray[i].name == playerAdd.name) {
            res.send({ "msg": "Player already exist" });
        }
    }
    playerArray.push(playerAdd)
    res.send({ "msg": "Player added succesfully" })

});

//PROBLEM 2----->BOOKING IN PLAYER COLLECTION

let playersArray = [{
    "name": "sourav",
    "dob": "4/3/1995",
    "gender": "male",
    "city": "delhi",
    "sports": ["swimming"],
    "booking": []
},
{
    "name": "ritesh",
    "dob": "3/2/2000",
    "gender": "male",
    "city": "goa",
    "sports": ["football"],
    "booking": []
}]

router.post('/players/:playerName/bookings/:bookingId', function (req, res) {

    let checkName = req.params.playerName
    let checkId = req.params.bookingId
    let bookingDetails = req.body
    for (let i = 0; i < playersArray.length; i++) {
        if (playersArray[i].name == checkName) {

            for (let j = 0; j < playersArray[i].booking.length; j++) {
                if (playersArray[i].booking[j].bookingNumber == checkId) {
                    res.send({ "msg": "Booking already processed" })
                }
            }
            playersArray[i].booking.push(bookingDetails)
            res.send({ "msg": "Booking Done" })
        }
    }

    res.send({ "msg": "Player not found" })
});


module.exports = router;
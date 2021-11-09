const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.get('/movies', function (req, res) {
    res.send(['No Time To Die','Dune','The Suicide Squad','Shang-Chi And The Legend Of The Ten Rings'])
});

router.get('/movies/:movieIndex', function (req, res) {
   
    let movies =['No Time To Die','Dune','The Suicide Squad','Shang-Chi And The Legend Of The Ten Rings']
    let index = req.params.movieIndex
    let movieAtIndex= movies[index]

    //res.send([movieAtIndex])

    //value>movies.length?res.send("Enter valid Index"):res.send(movies[value])
if (index> movies.length-1){
    res.send("Invalid Input")
}else{
    res.send(movies[index])
}
    
});


router.get('/films', function (req, res) {
   
    let movies =[{"id":1,"name":'No Time To Die'},{"id":2,"name":'Dune'},{"id":3,"name":'The Suicide Squad'},{"id":4,"name":'Shang-Chi And The Legend Of The Ten Rings'}]
    res.send(movies)   
});

router.get('/films/:filmsid', function (req, res) {
   
    let movies =[{"id":1,"name":'No Time To Die'},{"id":2,"name":'Dune'},{"id":3,"name":'The Suicide Squad'},{"id":4,"name":'Shang-Chi And The Legend Of The Ten Rings'}]
     

const result = movies.filter(x=>{
    return x.id == req.params.filmsid
})
    console.log(result);
    res.send(result)


// let movies = movies.length
// let req = req.params.filmsid
// let value = req <= movies ? movies[req-1] : 'there is no movie with this ID'
// res.send(movies)

});






module.exports = router;
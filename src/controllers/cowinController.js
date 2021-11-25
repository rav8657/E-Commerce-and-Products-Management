const axios = require("axios");

// res.status(200). send( { data: userDetails } )

const getStatesList = async function (req, res) {
    try {
        let options = {
            method: "get",
            url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
        };
        const cowinStates = await axios(options);

        console.log("WORKING");
        let states = cowinStates.data;
        res.status(200).send({ msg: "Successfully fetched data", data: states });

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }

};




const getDistrictsList = async function (req, res) {

    try {
        let id = req.params.stateId
        console.log(" state: ", id)

        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}` //plz take 5 mins to revise template literals here
        }
        let response = await axios(options)

        let districts = response.data

        console.log(response.data)
        res.status(200).send({ msg: "Success", data: districts })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "Something went wrong" })
    }
}







const getByPin = async function (req, res) {

    try{ 

        let pin= req.query.pincode
        let date= req.query.date

        let options = {
          method : "get",
          url : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let response= await axios(options)
        


        let centers= response.data
        console.log(centers)
        res.status(200).send( {msg: "Success", data: centers} )

    }
    catch(err) {
        console.log(err.message)
        res.status(500).send( { msg: "Something went wrong" } )
    }
}





const getOtp = async function (req, res) {

    try {

        let options = {
            method: "post", // method has to be post
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: { "mobile": req.body.mobile } // we are sending the json body in the data 
        }
        let response = await axios(options)

        let id = response.data
        res.status(200).send({ msg: "Success", data: id })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "Something went wrong" })
    }
}




const confirmOtp = async function (req, res) {

    try {
        console.log(req.body)
        let options = {
            method: "post", // method has to be post
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP`,
            data: { "otp": req.body.otp, "txnId": req.body.txnId } // we are sending the json body in the data 
        }
        let response = await axios(options)

        console.log(response)

        let id = response.data
        res.status(200).send({ msg: "Success", data: id })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "Something went wrong" })
    }
}


////////////25/11/2021//////////////////
////////////////////////////////////////// Q1

const londonWeather = async function (req, res) {
    try {
        let city =req.query.q;
        let id = req.query.appid;
        let options = { 
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${id}`
        }
        let london = await axios(options)
        res.status(200).send({ msg: "Success", "data": london.data })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "Something went wrong" })
    }
   
}

module.exports.londonWeather = londonWeather;



/////////////////////////// Q2

let londonTemp = async function (req, res) {
    try {
        let city =req.query.q;
        let id = req.query.appid;
        let options = { 
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${id}`
        }
        let london = await axios(options)
        res.status(200).send({ msg: "Success", "data": london.data.main.temp })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "Something went wrong" })
    }


   
}

module.exports.londonTemp = londonTemp;


////////////////////////////// Q3
const getWeather = async function (req, res) {
    try {

        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjArray = []

        // [ { city: "bengaluru", temp: 290}, { city: "Mumbai", temp: 285} ,{ city: "Delhi", temp: 291}, { city: "Kolkata", temp: 288} ]

        //better to use for..of here
        for (i = 0; i < cities.length; i++) {

            let obj = { city: cities[i] }
            let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=f1a93c7f2832ca822dc0920253b1614a`)
            console.log(resp.data.main.temp)

            obj.temp = resp.data.main.temp

            cityObjArray.push(obj)
        }

        let sorted = cityObjArray.sort(function (a, b) { return a.temp - b.temp })
        // can pass cityObjArray also here as sort method does sorting on the same array(in place) and original array is replaced by the sorted one
        //either ways both(sorted and cityObjArray) are referring to same array..assignment by reference is the default assignment in an array
        console.log(sorted)
        res.status(200).send({ status: true, data: sorted }) // can pass cityObjArray also here as sort method does sorting on the same array(in place) and original array is replaced by the sorted one
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: "server error" })
    }
}

module.exports.getWeather = getWeather;

/////////////////////////////


module.exports.getStatesList = getStatesList;
module.exports.getDistrictsList = getDistrictsList;
module.exports.getByPin = getByPin;
module.exports.getOtp = getOtp;
module.exports.confirmOtp = confirmOtp;
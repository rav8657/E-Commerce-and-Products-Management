const userModel = require("../models/userModel.js");

const axios = require("axios");


const getCrypto = async function (req, res) {
    try {
      let options = {
        headers :{ Authorization : "Bearer a015e0c9-5431-4fa4-bd48-2b0b90e997b8" },
        method: "get",
        url: "http://api.coincap.io/v2/assets",
      };
      let response = await axios(options);

      let coins = response.data.data;
  
      //   the above API gives back data for exactly 100 coins
      for (i = 0; i < coins.length; i++) {
        let coin = {
          symbol: coins[i].symbol,
          name: coins[i].name,
          marketCapUsd: coins[i].marketCapUsd,
          priceUsd: coins[i].priceUsd
        };
  
        await userModel.findOneAndUpdate({ symbol: coins[i].symbol }, coin, { upsert: true, new: true } );
      }
  
      // Here, We are sorting the coins in descending order of %change in last 24 hours ( you can also do ascending order). You can read up on stackoverflow on how to sort an array of objects based on a particular property or key
      // sort funciton sorts the array in place i.e. it performs the sorting operation and replaces the original array
      coins.sort( function (a, b) { return b.changePercent24Hr - a.changePercent24Hr; });
  
      res.status(200).send({ status: true, data: coins });
  
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: false, msg: "server error" });
    }
  };

module.exports.getCrypto = getCrypto;





// const cryptoInfo = await axios(options);  //cryptoInfo
  
// //console.log("WORKING");
// let info = cryptoInfo.data.data.sort(function(a,b){return b.changePercent24hr - a.changePercent24hr});
// for(let i=0; i<info.length; i++){
//     let data=(({name,symbol,marketCapUsd,priceUsd}) =>({name,symbol,marketCapUsd,priceUsd}))(info[i])
//     await userModel.findOneAndUpdate({"name":data.name},data,{upsert:true})
// }
// const finalData = await userModel.find()
// console.log(finalData);
// res.status(200).send({ msg: "Successfully fetched data", data: finalData });

// }
// catch (err) {
// console.log(err.message);
// res.status(500).send({ msg: "Some error occured" });
// }

// };












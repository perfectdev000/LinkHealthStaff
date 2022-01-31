
const ZipCodeData = require('zipcode-data');
const router = require("express").Router();

router.post("/getCityState", async (req, res) => {
    var zip = req.body.zip;
    var city, state;
    if(!ZipCodeData.isUSA(zip)){
      city = ZipCodeData.cityFromZip(zip);
      state = ZipCodeData.stateFromZip(zip);
      return res.status(200).send({
        data: {
          city: city,
          state: state
        },
        result: "OK"
      });
    }
    return res.status(200).send({
      data: [],
      result: "FAIL"
    });   
  });

  router.post("/getNearCityState", (req, res) => {
    var zipCode = req.body.zipCode;
    var name = req.body.name;
    var state = req.body.state;
    var newCity, newState;
    let num = 0;
    var i = 1;
    var nearLoc = [];
    var times = 1;
    if(zipCode > 60000)
      times = -1;
    while (num < 6) { 
      if(!ZipCodeData.isUSA(zipCode + i * times)){
          newCity = ZipCodeData.cityFromZip(zipCode + i * times);
          newState = ZipCodeData.stateFromZip(zipCode + i * times);
          if(name !== newCity || state !== newState){
              var temp = {
                  name: newCity,
                  state: newState,
                  zipCode: zipCode + i
              };
              var repeat = false;
              for(var j = 0; j < nearLoc.length; j++){
                  if(nearLoc[j].name === newCity && nearLoc[j].state === newState )
                      repeat = true;
              }
              if(!repeat){
                  nearLoc.push(temp);
                  num++;
              }
              i++;
          } else {
              i++;
          }
      } else {
          i++;
      }
      if(num === 6)
        return res.status(200).send({
          data: nearLoc,
          result: "OK"
        });            
      continue;
    }
  });

  module.exports = router;
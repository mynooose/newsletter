const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function (req,res) {
      res.sendFile(__dirname + "/signup.html");
})


app.post("/", function (req,res) {
    const fName = req.body.fname;
    const lName = req.body.lname;
    const email = req.body.email;

    //res.send("f :"+fName + " l:" + lName + " e:"+ email);

    const data = {
      members : [
        {
        email_address : email,
        status : "subscribed",
        merge_fields :{
          FNAME : fName,
          LNAME : lName
        }
    }
  ]
  };
    const jsonData = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/d1dc0b33f6";
    const options = {
      auth : "mjay:c9b9aa7ed1789895407bfce37c3e006c-us1",
      method : "POST"
    }


    const request = https.request(url,options, function (response) {
      console.log(response.statusCode);

      if(response.statusCode ===  200){
        res.sendFile(__dirname + "/success.html");
      }else {
        res.sendFile(__dirname + "/failure.html");
      }
      // response.on("data",function (data) {
      //     console.log(JSON.parse(data));
      // })
    })

    request.write(jsonData);
    request.end();

})


app.post("/failure", function (req,res) {
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function () {
  console.log("Server is up and running at port 3000.");
})


//api-key
//c9b9aa7ed1789895407bfce37c3e006c-us11
//list id
//d1dc0b33f6

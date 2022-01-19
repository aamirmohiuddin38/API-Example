// Loading modules and libraries
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

// Initialising express
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    let jokeCategory = req.body.jokeCategory;
    let jokeType = req.body.jokeType;
    let url = "https://v2.jokeapi.dev/joke/"+ jokeCategory +"?type="+ jokeType;   //api endpoint with parameters
    if(jokeType == 'single'){
        https.get(url,function(response){
            console.log(response.statusCode);
            response.on('data', function(data){
            let randomJoke = JSON.parse(data);     //converting data to JSON format
            const jokeContent = randomJoke.joke;    // accessfing paricular key
            res.write('<h1>' + "Here is Single Part joke for you:" + '</h1>');
            res.write('<p>' + jokeContent + '</p>');
            res.send();
            })
        })
    }
    else{
        https.get(url,function(response){
            console.log(response.statusCode);
            response.on('data', function(data){
            let randomJoke = JSON.parse(data);     //converting data to JSON format
            const jokeSetup = randomJoke.setup;    // accessfing paricular key
            const jokeDelivery = randomJoke.delivery;
            res.write('<h1>'+ "Here is Two part joke for you: "+ '</h1>');
            res.write(jokeSetup + "<br>" + jokeDelivery);
            res.send();
            })
        })
    }
    //res.send("Yes sever is succesfully running");
})

// Specify Port
app.listen(3000, () => console.log("Sever is running on port 3000! Succesfully"));
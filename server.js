const express = require("express");
const bodyParser = require("body-parser");
// allows us to dynamically build when we call from our current directory to where we 
// are trying to go
const path = require("path");

//compressing our js files via https so they are more optimized when run on by browsers
const compression = require("compression");

const enforce = require("express-sslify");


// package for handling CORS options

//var cors = require('cors')


// loads the .env environment when its not production, which allows our process env 
// to access our secret key
if (process.env.NODE_ENV !== "production") require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express()
const port = process.env.PORT || 5000;

// url enconded is a way for us to make sure the url string we are getting and passing out
// dont contain symbols and if they do they get escaped

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// in case the host hides our header 
// we do this because heroku runs a reverse proxy
// it allows us to forward unencrypted http traffic to the website
// heroku hides the header that originally would tell our application
// if the request is coming from an http request
// so we append this header that will tell us that to be sure
app.use(enforce.HTTPS({ trustProtoHeader : true }));

// blocks external api requqest that are not coming from our apps same origin ports
// cors

// Heroku determined based on the url paths what to do
// static allows us to serve a certain file inside of the url we pass to it
// our path is joining our directory which tells us what directory we are currently in
// then we are pointing to client/build (what gets build when we run the build script inside our package json)
// and we want to serve all the static files that are in there, and the only way able to serve them
// we have to specify what route we want to use
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));


    app.get("*", function(req,res){
        // for all get requests we are going to serve the index.html file
        // which hold everything 
        res.sendFile(path.join(__dirname, "client/build/public", "index.html"))
    })
}


app.post("/payment", (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "usd"
    };
    stripe.charges.create(body, (stripeErr, stripeRes) => {

        if (stripeErr){
            res.status(500).send({error : stripeErr})
        } else {
            res.status(200).send({success : stripeRes})
        }
    })
})



app.listen(port, error => {
    if (error) throw error;
    console.log("Server running on port " + port);
});

app.get('/service-worker.js', (req,res) => {
    // .. goes up since we are on our client , then we go to the build folder and then we sent the 
    // service worker .js, this file comes with our creat react app 
    res.sendFile(path.resolve(__dirname,'..', 'build' , 'service-worker.js'))

})
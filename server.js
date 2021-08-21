const express = require("express");
const bodyParser = require("body-parser");
// allows us to dynamically build when we call from our current directory to where we 
// are trying to go
const path = require("path");
const compression = require("compression");


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
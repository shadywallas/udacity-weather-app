// Setup empty JS object to act as endpoint for all routes
let projectData = {};
const port = 8080;

// Require Express to run server and routes
//external libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//retrieve all the weather data

app.get('/weather', (req, res) => {
    res.send(projectData);
});

//add a weather data by date
app.post('/addWeather', (req, res) => {

    console.log(req.body);
    const {date, temperature, userResponse} = req.body;

    projectData[date] = {
        temperature,
        date,
        userResponse
    };
    res.send(projectData);

});


//Local server should be running and producing feedback to the
// Command Line through a working callback function.

const server = app.listen(port, listener);

function listener() {

    console.log(`app started on port '${port}`);
}

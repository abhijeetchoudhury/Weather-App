const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000

const weatherData = require('../utils/weatherapp');

//all the paths:
const staticPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//using the paths:
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(staticPath));

//Routing 
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    });
})
app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error: "You must enter a location"
        })
    }
    weatherData(address, (error, {temperature, description, cityName}) => {
        if(error){
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    });
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 'page not found'
    })
})

app.listen(port, () => {
    console.log("Server is live at:", port);
})
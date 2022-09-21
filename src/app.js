const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const getGeocode = require('./utils/geocode')
const weatherDetails = require('./utils/weatherDetail')
const { read } = require('fs')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Zain Malik'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Zain Malik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message from App.js',
        title: 'Help',
        name: 'Zain Malik'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must specify an address to find GEO"
        })
    }
    getGeocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({
                error
            })
        }    
        weatherDetails(latitude, longitude, (error, { temperature, chanceOfRain, weatherDescription } = {} ) => {
            if (error) {
                return res.send({
                    error
                })
            }
    
            res.send({
                location,
                temperature,
                chanceOfRain,
                weatherDescription
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        error: 'Help article not found',
        name: 'Zain Malik'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        error: 'Page not Found',
        name: 'Zain Malik'
    })
})

app.listen(3000, () => {
    console.log("server is up on port 3000")
}) 
const request = require('postman-request')

const getWeatherDetails = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d4613ecd7944c19307c1cd533641428f&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather services", undefined)
        } else if (body.error) {
            callback("Unable to find Location", undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                chanceOfRain: body.current.feelslike,
                weatherDescription: body.current.weather_descriptions[0],
                windSpeed: body.current.wind_speed
            })
        }
    })
}

module.exports = getWeatherDetails
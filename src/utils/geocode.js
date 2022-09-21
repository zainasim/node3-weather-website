const { date } = require('assert-plus')
const request = require('postman-request')

const getGeocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiemFpbmFzaW0xMjMiLCJhIjoiY2w4MDhsdzllMDN1MTN2dDlwMmh5cngxZyJ9.sId0BDEj2Cj0SdOn2R6m4g&limit=1'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Geocode services', undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find co-ordinates", undefined)
        } else {
            callback(undefined, {
                latitude :body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = getGeocode
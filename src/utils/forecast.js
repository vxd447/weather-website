const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/85cfc61ed7739109dc8f76d60ecfe028/'+latitude+','+longitude
    request( { url,json : true }, (error, { body } = {}) => {
            if (error){
                callback('Unable to connect to the Internet',undefined)
            } else if (body.error){
                callback('Unable to find location',undefined)
            } else{
                const rain = body.currently.precipProbability
                const temp = body.currently.temperature
                const summary = body.daily.data[0].summary
                const highTemp = body.daily.data[0].temperatureHigh
                const lowTemp = body.daily.data[0].temperatureLow
                callback(undefined,summary+'Today\'s Highest Temperature is '+highTemp+' and Lowest Temperature is '+lowTemp +' It is currently '+temp+' degrees out.'+'There is '+rain+'% chance of rain.')
            }
        })
}

module.exports = forecast
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Creating instance oObject of express module
const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicPathDirectory = path.join(__dirname,'../public')
const viewsPathDirectory = path.join(__dirname,'../templates/views')
const partialsPathDirectory = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPathDirectory)
hbs.registerPartials(partialsPathDirectory)

//Setup static directory to serve
app.use(express.static(publicPathDirectory))

//Setting up the routes using app.get('/routes',callback function)
app.get('' , (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vaibhav'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vaibhav Dua'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        name: 'Vaibhav',
        title: 'Help'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    //Calling geocode 
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error){   
            return res.send({
                error: error,
            })
        }
        //Calling Forecast
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){   
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Article not found',
        name : 'Vaibhav',
        error: 'Help article not found'
    })
})
//Setting up 404 pages if route is not found in the above routes
app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name : 'Vaibhav',
        error: 'Page not found'
    })
})

//Starting the port using app.listen(port-no, callback function)
app.listen(port, () => {
    console.log('Server is up on port '+port)
})
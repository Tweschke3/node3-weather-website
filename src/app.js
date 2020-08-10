const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebar engine and views engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Service',
        name: 'Lennart Buesge'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Lennart Buesge'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Lennart Buesge',
        helpText: 'Some nice useful text'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    forecast(req.query.address, (error, forecastData) => {
        if (error) {
            return res.send({
                error
            })
        } 
        if (typeof forecastData !== 'object') {
            return res.send({
                error: 'Please avoid umlauts'
            })
        }
        res.send({
            location: forecastData.request.query,
            temperature: forecastData.current.temperature
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// 404 Sites

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lennart Buesge',
        ErrorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lennart Buesge',
        ErrorMessage: 'Page not found'
    })
})

app.listen(port, () => {
})
    console.log('Server is up on Port ' + port)
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')


//console.log(__dirname)
//console.log(path.join(__dirname, '../about'))

const app = express()

// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')   
const partialsPath = path.join(__dirname, '../templates/partials') 

//Setup hendlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))




app.get('', (req , res) => {
    res.render('index',{
        title: 'Weather Bonn/Venusberg',
        name: 'Zeljko'
    })

})

app.get('/about',(req , res) => {
    res.render('about', {
        title: 'About',
        name: 'Site'
    })
})

app.get('/help',(req , res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'people to learn'
    })
})
/* app.get('', (req, res) => {

    res.send('<h1> Weather <h1>')   iznad pisanje html iz index.html
    
} ) */

/* app.get('/help', (req, res) => {
    res.send([{
        name: 'Zeljko',
        age: 28
    },{
        name: 'Slavisa'
    }])
}) */


//app.get('/about', (req, res) => {
 //   res.send('<h1> About <h1>')
//})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return   res.send({
               error: ' Address musst be provided'
           })
       }
       geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {

        if (error) {
          return    res.send({error})
        }
       
        forecast(latitude,longitude , (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location , //location: location 
                address: req.query.address            })
        })
})
   /*  res.send({
        forecast: 'It is sunny' ,
        location: 'Bonn',
        address: req.query.address
    }) */
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
     return   res.send({
            error: ' You musst provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req, res) => {             //spec req does not exist
    res.render('404', {
        title: '404',
        name: 'Zeljko',
        errorMessage: 'Help article not found.'
    })
   
})

app.get('*', (req, res) => {                // * every request does not exist

    res.render('404', {
        title: '404',
        name: 'Zeljko',
        errorMessage: 'Page not found.'
    })

})



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
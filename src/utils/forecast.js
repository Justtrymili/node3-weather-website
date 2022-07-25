const request =  require('request')  //npm libraries

const forecast = (latitude,longitude,callback) => {
    const url ='http://api.weatherstack.com/current?access_key=3f2e507ef57bd255c25d9e773fc479c9&query=' + latitude + ',' +  longitude + '&units=m'
    
    request({url, json: true},(error , {body} = {}) => {
        if (error){
            callback('Unable to connect to weather service.',undefined)
        } else if (body.error) {
    
                callback('Unable to finde location.Try another',undefined)
    
        } else {
         //   const temperatura = response.body.current.temperature
           // const feelslike = response.body.current.feelslike
           // const description = response.body.current.weather_descriptions[0]
          
            callback(undefined, body.current.weather_descriptions[0] + '.It is currently ' + body.current.temperature + ' degress out. it feels like ' + body.current.feelslike + ' degrees out.The humidity is ' + body.current.humidity + ' %.'  )
              //  message: description + ' It is currently ' + temperatura + ' degress out. it feels like ' + feelslike + ' degrees out.'} )
    
        }
    } )

}






module.exports = forecast
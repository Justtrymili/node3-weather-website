const request =  require('request')
const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoidm96ZCIsImEiOiJjbDV3YnI1Zm8wMzd1M2VxcDJycmRudmk2In0.Fhh0DYF7P-bM-mDV8MIPxg&limit=1'
   
    request({url,json: true},(error , {body} = {} ) => {
        if (error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to finde location .Try another search.',undefined)
        } else {
         callback(undefined,{
            latitude : body.features[0].center[1]   ,     
            longitude : body.features[0].center[0]  ,
            location : body.features[0].place_name , 

         
         })   
        
        }
    })
}

module.exports = geocode
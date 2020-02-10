const axios = require ('axios')

class WeatherController {
   static getWeather(req, res, next) {
      axios({
         method : `GET`,
         url : `http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&APPID=8a4aa542f752975693c631a75b9fbf51`
      })
         .then (({data}) => {            
            res.status(200).json({data, city: data.name, main: data.weather[0].main})
            // Rain, Clouds, Clear
         })
         .catch(err => {            
            next(err)
         })
   }

}

module.exports = WeatherController
/*
{
  "timestamp": xxxxxxxx,
  "currentSensorStateData": [
  ]
}
*/

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function (){
    return {
        "currentSensorStateData": {
            "measure_rain": getRandomInt(0,1),
            "meter_rain": getRandomInt(0,100),
            "measure_pm25": getRandomInt(25,30),
            "measure_humidity": getRandomInt(50,80),
            "measure_temperature": getRandomInt(25,30),
        }
    }
}

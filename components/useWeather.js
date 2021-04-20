import postscribe from 'postscribe'
import { useEffect } from 'react'
const useWeather = (mountPoint) => {
  useEffect(() => {
    postscribe(
      mountPoint,
      `
<div id="weather-v2-plugin-simple"></div>
<script>
WIDGET = {
  CONFIG: {
    "modules": "01234",
    "background": 5,
    "tmpColor": "FFF",
    "tmpSize": 14,
    "cityColor": "FFF",
    "citySize": 14,
    "aqiSize": 14,
    "weatherIconSize": 24,
    "alertIconSize": 18,
    "padding": "10px 10px 10px 10px",
    "shadow": "0",
    "language": "auto",
    "fixed": "true",
    "vertical": "middle",
    "horizontal": "center",
    "left": "12",
    "top": "12",
    "key": "ydv69AmsJg"
  }
}
</script>
<script src="https://apip.weatherdt.com/simple/static/js/weather-simple-common.js?v=2.0"></script>
`
    )
  }, [mountPoint])
}

export default useWeather

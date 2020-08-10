const getWeather = (address) => {
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                weather_p.innerHTML = data.error
            } else {
                weather_string = 'The weather in \"' + data.location + '\" is ' + data.temperature + '°C'
                weather_p.textContent = weather_string
            }
        })
})
}

const weather_p = document.querySelector('.weather_p')
const weatherform = document.querySelector('form')
const search = document.querySelector('input')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    weather_p.textContent = "Loading..."
    getWeather(search.value)
})
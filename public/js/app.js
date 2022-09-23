const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const url = '/weather?address=' + location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.weatherDescription + ', Temperature: ' + data.temperature
                messageThree.textContent = 'Chance of Rain: ' + data.chanceOfRain + ', Wind Speed: ' + data.windSpeed
            }
        })
    })
})
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

//Adding event listner when submitting using the button
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading.....'
    messageTwo.textContent = ''
    //Fetching the json object from the weather route 
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                //console.log(data.error)
                messageOne.textContent = 'Error: ' + data.error
            } else{
                //console.log(data.forecast,data.location)
                messageOne.textContent = 'Location: ' + data.location
                messageTwo.textContent = 'Forecast: ' + data.forecast 
            }
        })
    })
})
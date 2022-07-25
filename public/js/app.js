


//spajanje beckend side sa client side



const weatherForm = document.querySelector('form')                    //always target first form/input
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')               // target spec p by id another otion is class
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From java script'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()                                                               //testing not refres browser
    const location = searchElement.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
 fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error){
        return messageOne.textContent = data.error
        }else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            
        }
    })
      
})
   
   
})
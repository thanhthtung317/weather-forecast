const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    fetch("/weather?address=" + search.value).then(
      (res) => {
        res.json().then((data) => {
          if (data.error) {
            console.log(data.error);
            messageOne.textContent = data.error
            messageTwo.textContent = ''
          } else {
            console.log(data);
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
          }
        });
      }
    );
})



const givenCode = document.getElementById('message');
const dropDown = document.getElementById('options');
const button = document.getElementById('convert-btn');
const res = document.getElementById('result');
const animation = document.querySelector('.animation');
let langToBeConverted = dropDown.value;

dropDown.addEventListener('change', () => {
     langToBeConverted = dropDown.value;
})
res.readOnly = true;
button.addEventListener('click', () => {
    animation.innerHTML = `<div class="loading-animation">
                            <div></div>
                            <div></div>
                            <div></div>
                            </div>`;
  
    if(!givenCode.value){
        res.value = 'type something mf'
        return;
    }
    console.log('hi');
    fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lang: langToBeConverted,
            message: givenCode.value
        })
    })
    .then(res => res.json())
    .then(data => {
        res.textContent = `${data.completion.content}`
         animation.innerHTML = ''
    })
})

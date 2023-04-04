const giveCode = document.getElementById('message');
const dropDown = document.getElementById('options');
const button = document.getElementById('convert-btn');
const res = document.getElementById('result');
let langToBeConverted = ''

dropDown.addEventListener('change', () => {
     langToBeConverted = dropDown.value;
})

button.addEventListener('click', () => {
    console.log('hi');
    fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lang: langToBeConverted,
            message: giveCode.value
        })
    })
    .then(res => res.json())
    .then(data => {
        res.textContent = `${data.completion.content}`
    })
})
const givenCode = document.getElementById('message');
const dropDown = document.getElementById('options');
const button = document.getElementById('convert-btn');
const res = document.getElementById('result');
const loading = document.getElementById('loading');
let langToBeConverted = dropDown.value;

dropDown.addEventListener('change', () => {
     langToBeConverted = dropDown.value;
})
res.readOnly = true;
button.addEventListener('click', () => {
    loading.style.display = 'block';
  
    if(!givenCode.value){
        res.value = 'type something mf'
        loading.style.display = 'none';
        return;
    }
    console.log('hi');
    fetch('https://code-converter-us52.onrender.com/', {
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
        loading.style.display = 'none';
    })
    .catch(error => {
        res.textContent = `Some error has Occured on the server side please try again`
        loading.style.display = 'none';
    })
})

console.log('Client side javascript is loaded!');

fetch('http://localhost:3000/weather?address=Santa%20Teresa%20Del%20Tuy').then(response => {
    console.log(response);
    
    response.json().then(data => console.log(data));
});
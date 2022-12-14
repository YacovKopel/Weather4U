var button=document.querySelector('.btn')
var inputCity=document.querySelector('#city')

// create list for previous searches
{/* <div class="list-group">
<a href="#" class="list-group-item list-group-item-action">
  Cras justo odio
</a>
</div> */}

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}



function getApi() {
var APIKey= '2be8ab84dbdf28d2330a1f83c3f60a1a';
'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}'
var city=inputCity.value
var queryURL ='http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=1&appid='+APIKey 
console.log(queryURL)
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
    console.log(data)
    console.log(data[0].lat)
    console.log(data[0].lon)
  
  }
    );
  }
function getWeather() {
  var weatherURL= 'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&cnt=5&units=imperial&appid='+ APIKey
console.log(weatherURL)
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
    console.log(data)
    // console.log(data.name)
    // console.log(data)
  
  }
    );
  }

button.addEventListener('click', getApi);

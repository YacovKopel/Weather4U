var button=document.querySelector('.btn')
var inputCity=document.querySelector('#city')
var dailyW= document.querySelector('.dailyW')
var cityName=document.querySelector('.cityName')
var tempNow=document.querySelector('.temp')
var windNow=document.querySelector('.wind')
var humidNow= document.querySelector('.humidity')

var today=dayjs().format("MM/DD/YYYY")

var nextDay = "";
// function returnDay() {
// for (let i = 1; i < 6; i++){
//   nextDay = dayjs().add(i, "day").format("MM/DD/YYYY");
//   console.log(nextDay);
// }
// }
// returnDay()

// create list for previous searches
/* <div class="list-group">
<a href="#" class="list-group-item list-group-item-action">
  Cras justo odio
</a>
</div> */




var APIKey= '2be8ab84dbdf28d2330a1f83c3f60a1a';
function getApi() {
var city=inputCity.value
var queryURL ='http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=1&appid='+APIKey 
console.log(queryURL)
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
      var latitude= data[0].lat
      var longitude =data[0].lon
      getWeather(latitude,longitude)
      console.log(data)
    
  }
    );
  }
function getWeather(latitude,longitude) {
  var weatherURL= 'http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&cnt=6&units=imperial&appid='+ APIKey
console.log(weatherURL)
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
    console.log(data)
    // makes city names uppercase
    let arr = inputCity.value.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    var cityUp = arr.join(" ");

    cityName.textContent= cityUp + '  ' + today
    tempNow.textContent='Temp: '+ data.list[0].main.temp+ "°F"
    windNow.textContent='Wind: '+ data.list[0].wind.speed+ 'MPH'
    humidNow.textContent='Humidity: '+ data.list[0].main.humidity + '%'
    
     
    for (let i = 1; i < data.list.length; i++) {
      var temp =data.list[i].main.temp
      var humidity =data.list[i].main.humidity
      var wind =data.list[i].wind.speed
      nextDay = dayjs().add(i, "day").format("MM/DD/YYYY");

      var div1=document.createElement('div');
      div1.setAttribute("class", "class='col-12 col-sm-6 col-lg-3'")
      dailyW.appendChild(div1)
      var divClass= document.createElement('div')
      divClass.setAttribute("class","card text-center py-3 mx-3")
      div1.appendChild(divClass)
      var date= document.createElement('h6')
      date.textContent= "Date: " + nextDay
      divClass.append(date)
      var temperature= document.createElement('p')
      temperature.textContent= "Temp: " + temp+ "°F"
      divClass.append(temperature)
      var windy= document.createElement('p')
      windy.textContent= "Wind: " + wind+ ' MPH'
      divClass.append(windy)
      var humid= document.createElement('p')
      humid.textContent= "Humidity: " + humidity+ '%'
      divClass.append(humid)
      
    }
  
  }
    );
  }

button.addEventListener('click', getApi);

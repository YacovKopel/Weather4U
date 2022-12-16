var button=document.querySelector('.btn')
var inputCity=document.querySelector('#city')
var dailyW= document.querySelector('.dailyW')
var cityName=document.querySelector('.cityName')
var tempNow=document.querySelector('.temp')
var windNow=document.querySelector('.wind')
var humidNow= document.querySelector('.humidity')
var searchCity=document.querySelector('.searchCity')
var cityBtn= document.querySelector('.cityButton')

var APIKey= '2be8ab84dbdf28d2330a1f83c3f60a1a';
var today=dayjs().format("MM/DD/YYYY")
var nextDay = "";

// create list for previous searches
function saveToList(){
var newtab=document.createElement('div')
newtab.setAttribute("class","list-group mt-3")
searchCity.appendChild(newtab)
var newName= document.createElement('button')
newName.setAttribute("type", "button")
newName.setAttribute("href", "#")
newName.setAttribute("class","list-group-item list-group-item-action btn cityButton" )
var listName= JSON.parse(localStorage.getItem("cityData"))
newName.textContent=listName
newtab.append(newName)
}


// gets lat and lon of city
function getApi(city) {
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
      // call getWeather function and pass into it the lat and lon to get city weather data
      getWeather(latitude,longitude)
      console.log(data)
    
  }
    );
  }

  // gets city weather
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


// todays weather at city
 cityName.textContent= cityUp + '  ' + today
 tempNow.textContent='Temp: '+ data.list[0].main.temp+ "°F"
 windNow.textContent='Wind: '+ data.list[0].wind.speed+ 'MPH'
 humidNow.textContent='Humidity: '+ data.list[0].main.humidity + '%'
 
//  loop to get 5 day forecast of weather in city
 for (let i = 1; i < data.list.length; i++) {
   var temp =data.list[i].main.temp
   var humidity =data.list[i].main.humidity
   var wind =data.list[i].wind.speed
   var icon=data.list[i].weather[0].icon
   nextDay = dayjs().add(i, "day").format("MM/DD/YYYY");

// created 5 identical divs 
   var div1=document.createElement('div');
   div1.setAttribute("class", "class='col-12 col-sm-6 col-lg-3'")
   dailyW.appendChild(div1)
   var divClass= document.createElement('div')
   divClass.setAttribute("class","card text-center py-3 mx-3")
   div1.appendChild(divClass)
   var date= document.createElement('h6')
   date.textContent= "Date: " + nextDay
   divClass.append(date)
   var emoji= document.createElement('img')
   emoji.setAttribute("src", "https://openweathermap.org/img/w/"+icon+".png")
   divClass.append(emoji)
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
//  save into local Storage
 localStorage.setItem('cityData', JSON.stringify(cityUp))

//  displays button with previous city search
 saveToList()

  // var wat =JSON.parse(localStorage.getItem("cityData")) || []
  
  });
 
}
button.addEventListener('click', getApi)
{
console.log("click")}
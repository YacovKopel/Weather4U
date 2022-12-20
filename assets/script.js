var button=document.querySelector('.btn')
var inputCity=document.querySelector('#city')
var dailyW= document.querySelector('.dailyW')
var cityName=document.querySelector('.cityName')
var tempNow=document.querySelector('.temp')
var windNow=document.querySelector('.wind')
var humidNow= document.querySelector('.humidity')
var searchCity=document.querySelector('.cityListContainer')
var cityBtn= document.querySelector('.cityButton')

var APIKey= '2be8ab84dbdf28d2330a1f83c3f60a1a';
var today=dayjs().format("MM/DD/YYYY")
var nextDay = "";

// array of searched Cities
var searchCities=[]

// gets last searched cities to save to webpage
function init(){
  var listName= JSON.parse(localStorage.getItem("cityData"))
    if (listName !== null) {
      searchCities = listName;
    } 
    saveToList()
};
// create list for previous searches
function saveToList(){
searchCity.innerHTML="";
for (let i = 0; i < searchCities.length; i++) {
var selectedCity= searchCities[i]
var newName= document.createElement('button')
newName.setAttribute("type", "button")
newName.setAttribute("class"," col-12 btn bg-light cityButton mt-3")
newName.setAttribute("data-city",selectedCity)
newName.textContent=selectedCity
searchCity.appendChild(newName)
}
}


// gets lat and lon of city
function getApi(city) {
var queryURL ='https://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=1&appid='+APIKey 
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
      var latitude= data[0].lat
      var longitude =data[0].lon
      // call getWeather function and pass into it the lat and lon to get city weather data
      getWeather(latitude,longitude)
  });
  }

  // gets city weather
function getWeather(latitude,longitude) {
  var weatherURL= 'https://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&cnt=6&units=imperial&appid='+ APIKey
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data){

// todays weather at city
 cityName.textContent= data.city.name + '  ' + today
 tempNow.textContent='Temp: '+ data.list[0].main.temp+ "°F"
 windNow.textContent='Wind: '+ data.list[0].wind.speed+ 'MPH'
 humidNow.textContent='Humidity: '+ data.list[0].main.humidity + '%'
 
 dailyW.innerHTML=''
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
  
  });
 
}
// updates page with weather info when search button pressed
button.addEventListener('click', function(event){
  event.preventDefault();
  var city=inputCity.value.trim()
  searchCities.push(city)
  //  save into local Storage
  localStorage.setItem('cityData', JSON.stringify(searchCities))
  getApi(city);
  init();
})

// updates page when user selects previously searched city from list
searchCity.addEventListener('click', function(event){
var element= event.target;
if (element.matches('button')){
var city= element.getAttribute("data-city")
getApi(city)
}

})

init()
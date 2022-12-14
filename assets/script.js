var button=document.querySelector('.btn')
var inputSearch=document.querySelector('#search')

// create list for previous searches
{/* <div class="list-group">
<a href="#" class="list-group-item list-group-item-action">
  Cras justo odio
</a>
</div> */}

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}



function getApi() {
var APIKey= 'fe6bea862984553e2839a7b15d567c7a';
var city=inputSearch.value
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=standard&appid=" + APIKey;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
    console.log(data)}
    );
  }

button.addEventListener('click', getApi);

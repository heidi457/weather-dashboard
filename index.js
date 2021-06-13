const storageInput = document.querySelector('.storage');
const text = document.querySelector('.text');
const button = document.querySelector('button');
const storedInput = localStorage.getItem('textinput')



// assign global variables /////////////////////////////////////////////////////
// apiKey
// HMTL IDS
// city
// temp
// wind
// humidty
// uv index - set class
// five day container
// cities history
let cities = [];
// functions //////////////////////////////////////////////////////////////////
// init
function init() {
    // check local storage for the key (cities) if present
    let citiesStorage = localStorage.getItem('cities');
    if (citiesStorage) {
        // loop through local storage and create buttons with the button label as the city
        cities = JSON.parse(citiesStorage);
        console.log(cities);
        cities.forEach(city => {
        createBtns(cities);
        })
    }
    console.log('no data');
    coordinatesApiCall();
}
//getWeather
function coordinatesApiCall() {
    const city = document.getElementById("search-text").value || "chicago";
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=393ac77ad5bc24acdc3332d8329e2854&units=imperial`;
    fetch(endpoint)

    .then((res) => res.json())
        .then(data => {
            let long = data.coord.lon;
            let latt = data.coord.lat;
            callWeatherApi(long, latt);
            document.getElementById("city").textContent = data.name;
            let locationTimezone = document.querySelector("locationtimezone");
        console.log(data);
        });
}

function callWeatherApi(lon, lat) {
    let endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=393ac77ad5bc24acdc3332d8329e2854`;
    fetch(endpoint)

    .then((res) => res.json()) 
    .then(data => {
        document.getElementById("temp").textContent= data.current.temp;
        document.getElementById("wind").textContent= data.current.wind_speed;
        document.getElementById("humidity").textContent= data.current.humidity;
        document.getElementById("uv").textContent= data.current.uvi;
        // document.getElementById("weather").textContent= data.current.weather[0].description;


        console.log(data);

        //loop through this for each day to get it instead. Day 0 is today.
        let unix_timestamp = data.daily[0].dt
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);
        var formattedTime = date;
        console.log(formattedTime);

        
    });
}



// parm: value of search box (city name)
// call the weather api with the city name to get the coordinates (lat, lon)
// find the lat and lon within the data and set them as varibles
// in the then of the call above, use the lat and lon to get curent weather and future
// in the then of the call above, i find the data i need for the top card on the right (city, date, temp, wind, humity, uv index)
// RENDER FUNCTION if uv index greater than some value, set the class
// RENDER FUNCTION for the 5 day forecast i want to loop through array of daily data and dynamically create a card and append it to the website
// each card will have date, icon for condition, temp, wind, humidty
// save to localstorage the city the user just searched,
// check loclastorage for that city, dont add if already there
// events ////////////////////////////////////////////////////////////////////
// init - check local storage
init();




document.getElementById("btn").addEventListener("click", function (event) {
    event.preventDefault();
    console.log("button clicked")
    city = document.querySelector("#search-text").value
    console.log(city)
    coordinatesApiCall();
});




// if(storageInput) {
//     text.textContent = storedInput
// }

// storageInput.addEventListener('input', letter => {
//     text.textContent = letter.target.value
// })

// const saveToLocalStorage = () => {
//     localStorage.setItem('textinput', text.textContent)
// }

// button.addEventListener('click', saveToLocalStorage)



// click search button - call the api and get our cream filling
// click on past city button (class) - just call the getWeather function with the label of the buton


const apikey = "82acf18a2a71fbfcadb02f060a83d1b7";

//1. here i get all the element that needs to be changed and used for the app

const weatherDataE1 = document.getElementById("weather-data");

const cityInputE1 = document.getElementById("city-input");

const formE1 = document.querySelector("form");


//2. i added a method callled addeventlistener to the form so it can triger the submit button
//3.the event added to the func is used to get the value of the input

formE1.addEventListener("submit", (event) => {
    //4.to prevent the page from refreshing, i use
    event.preventDefault();
    //5. to get the value of whet we entered in the input i use 
    const cityValue = cityInputE1.value;
    //6. here we pass the value to the 
    getWeatherData(cityValue);

});

async function getWeatherData(cityValue){
    try {
        //7. to create a request for the weather api, ? is added to the first parameter then the following  starts with &
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
        
        
        if (!response.ok) {
            throw new Error("response not ok");
            
        }

        //8. here we convert response to json and then convert json to our data
        const data = await response.json();

        

        //9. here we get all the information we need from the data
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        //10. here i turn the details to an array form
        const details = [
            `feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ]

        //11. here i changed the element in the html file to the information using queryselector to select their class and g
        weatherDataE1.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataE1.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherDataE1.querySelector(".description").textContent = `${description}`;
        weatherDataE1.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
    } catch (error) {
        weatherDataE1.querySelector(".icon").innerHTML = "";
        weatherDataE1.querySelector(".temperature").textContent = "";
        weatherDataE1.querySelector(".description").textContent = "An error happened, plese try again later or check if the spelling is correct!";
        weatherDataE1.querySelector(".details").innerHTML = "";
        
    }
}
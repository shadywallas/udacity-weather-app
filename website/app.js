/* Global Variables */
// API credentials on OpenWeatherMap.com
const key = '606f567efb0fcf2caf5a9567b4829273';
const baseUrl = `//api.openweathermap.org/data/2.5/weather`;
const generateButton = document.getElementById('generate');
const zipTextField = document.getElementById('zip');
const userResponseTextFiled = document.getElementById('feelings');
const DateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');
// Create a new date instance dynamically with JS
let d = new Date();

let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

//retrieve weather data by zip name from OpenWeatherMap.com
async function getApiWeatherData(zip, apiKey) {
    const url = `${baseUrl}?zip=${zip}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);

    let temp = 0;
    try {
        const data = await res.json();
        temp = data.main.temp;

    } catch (error) {
        throw new Error('couldn\'t load data');
    }

    return temp;
}
//post request to send weather data to server
const saveWeatherData = async (temperature, date, userResponse) => {
    const res = await fetch('/addWeather', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            temperature,
            date,
            userResponse
        })
    });
    return res;
};

const getWeatherData = async () => {
    const res = await fetch('/weather');
    try {
        return await res.json();
    } catch (error) {
        console.log('error', error);

    }
}


//creat event listeners
generateButton.addEventListener('click', () => {
    getApiWeatherData(zipTextField.value, key)
        .then((temp) => {
            saveWeatherData(temp, newDate, userResponseTextFiled.value)
                .then((res) => {
                    getWeatherData().then((res) => {
                        DateElement.innerText = res[newDate].date;
                        tempElement.innerText = res[newDate].temperature + ' °C';
                        contentElement.innerText = res[newDate].userResponse;
                    })
                    // call api again GET / weather
                    // all weather data stored in the app
                });

        });
});


///


getWeatherData().then((res) => {
    if (res[newDate]){
        DateElement.innerText = res[newDate].date;
        tempElement.innerText = res[newDate].temperature + ' °C';
        contentElement.innerText = res[newDate].userResponse;
    }
})

const weather = document.querySelector("#weather");
const loader = document.querySelector("#loader");

let latitude;
let longitude;
let city;

const getData = () => {
  fetch("https://get.geojs.io/v1/ip/geo.json").then((res) => {
    const data = res.json().then((data) => {
      latitude = data.latitude;
      longitude = data.longitude;
      city = data.city;
    });
  });
};

const getWeather = () => {
  getData();

  loader.classList.toggle("loader-hide");
  setTimeout(async () => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const data = await res.json();
    const temperature = data.current_weather.temperature;
    const windspeed = data.current_weather.windspeed;
    const winddirection = data.current_weather.winddirection;
    const weathercode = data.current_weather.weathercode;
    createWeatherCard(temperature, windspeed, winddirection, weathercode);
    loader.classList.toggle("loader-hide");
  }, 1500);
};

const createWeatherCard = (
  temperature,
  windspeed,
  winddirection,
  weathercode
) => {
  // Создаем контейнер для карточки
  const card = document.createElement("div");
  card.classList.add("weather-card");

  // Заголовок для карточки
  const title = document.createElement("h3");
  title.textContent = `Current Weather ${city}`;
  //Картинка
  const weatherIcon = document.createElement("img");
  weatherIcon.src = `${weatherCodeInterpretationImg(weathercode)}`;
  weatherIcon.alt = "Weather Icon";
  weatherIcon.classList.add("weather-icon");

  // Код погоды
  const weathercodeElement = document.createElement("p");
  weathercodeElement.textContent = `${weatherCodeInterpretation(weathercode)}`;

  // Температура
  const tempElement = document.createElement("p");
  tempElement.textContent = `Temperature: ${temperature} °C`;

  // Скорость ветра
  const windspeedElement = document.createElement("p");
  windspeedElement.textContent = `Windspeed: ${windspeed} km/h`;

  // Направление ветра
  const winddirectionElement = document.createElement("p");
  winddirectionElement.textContent = `Wind Direction: ${winddirection}°`;

  // Добавляем карточку в контейнер на странице
  card.append(
    title,
    weatherIcon,
    weathercodeElement,
    tempElement,
    windspeedElement,
    winddirectionElement
  );
  weather.append(card);
};
function weatherCodeInterpretationImg(weathercode) {
  let src;
  switch (weathercode) {
    case 0:
      src = "./resources/sun.png";
      break;
    case 1:
    case 2:
    case 3:
      src = "./resources/sunny.png";
      break;
    case 45:
    case 48:
      src = "./resources/clouddy.png";
      break;
    case 51:
    case 53:
    case 55:
      src = "./resources/weather.png";
      break;
    case 56:
    case 57:
      src = "./resources/weather.png";
      break;
    case 61:
    case 63:
    case 65:
      src = "./resources/heavy-rain.png";
      break;
    case 66:
    case 67:
      src = "./resources/snowy.png";
      break;
    case 71:
    case 73:
    case 75:
      src = "./resources/snowy.png";
      break;
    case 77:
      src = "./resources/snowy.png";
      break;
    case 80:
    case 81:
    case 82:
      src = "./resources/heavy-rain.png";
      break;
    case 85:
    case 86:
      src = "./resources/snowy.png";
      break;
    case 95:
      src = "./resources/heavy-rain.png";
      break;
    case 96:
    case 99:
      src = "./resources/heavy-rain.png";
      break;
    default:
      src = "./resources/sun.png";
  }
  return src;
}

function weatherCodeInterpretation(weathercode) {
  let text;
  switch (weathercode) {
    case 0:
      text = "Clear sky";
      break;
    case 1:
    case 2:
    case 3:
      text = "Mainly clear, partly cloudy, and overcast";
      break;
    case 45:
    case 48:
      text = "Fog and depositing rime fog";
      break;
    case 51:
    case 53:
    case 55:
      text = "Drizzle: Light, moderate, and dense intensity";
      break;
    case 56:
    case 57:
      text = "Freezing Drizzle: Light and dense intensity";
      break;
    case 61:
    case 63:
    case 65:
      text = "Rain: Slight, moderate and heavy intensity";
      break;
    case 66:
    case 67:
      text = "Freezing Rain: Light and heavy intensity";
      break;
    case 71:
    case 73:
    case 75:
      text = "Snow fall: Slight, moderate, and heavy intensity";
      break;
    case 77:
      text = "Snow grains";
      break;
    case 80:
    case 81:
    case 82:
      text = "Rain showers: Slight, moderate, and violent";
      break;
    case 85:
    case 86:
      text = "Snow showers slight and heavy";
      break;
    case 95:
      text = "Thunderstorm: Slight or moderate";
      break;
    case 96:
    case 99:
      text = "Thunderstorm with slight and heavy hail";
      break;
    default:
      text = "err";
  }
  return text;
}

getWeather();

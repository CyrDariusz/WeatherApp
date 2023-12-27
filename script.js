const searchBtn = document.querySelector(".search-btn");
const infoSection = document.querySelector(".info-section");
const wrapper = document.querySelector(".wrapper");
const image = document.querySelector("#image");
const infoBox = document.querySelector(".info-box");
const cityInput = document.querySelector("#city-name-input");
const notFound = document.querySelector(".not-found");
const notFoundImg = document.querySelector(".not-found img");
const notFoundParagraph = document.querySelector(".not-found p");
const humidity = document.querySelector(".humidity-info span");
const wind = document.querySelector(".wind-info span");
const description = document.querySelector(".description");
const temperature = document.querySelector(".temperature");
searchBtn.addEventListener("click", () => {
  const keyApi = "2502b3815a6cc5211e60cb5e59067cd2";
  const city = cityInput.value;

  if (city === "") {
    infoSection.style = "display:none;";
    notFound.classList.add("slide-down");
    notFound.style = "display:flex;";
    notFoundImg.classList.add("show-info");
    notFoundParagraph.classList.add("show-info");
  } 
  else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyApi}&units=metric`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === "404") {
          infoSection.style = "display:none;";
          notFound.classList.add("slide-down");
          notFound.style = "display:flex;";
          notFoundImg.classList.add("show-info");
          notFoundParagraph.classList.add("show-info");
        } else {
          notFound.style = "display:none;";
  
          switch (json.weather[0].main) {
            case "Clear":
              image.src = `img/clear.png`;
              
              break;
            case "Rain":
              image.src = `img/rain.png`;
              
              break;
            case "Snow":
              image.src = `img/snow.png`;
              
              break;
            case "Clouds":
              image.src = `img/cloudy-day.png`;
              
              break;
            case "Haze":
              image.src = `img/Haze.png`;
              
              break;
            case "Mist":
              image.src = `img/mist.png`;
              
              break;
  
            default:
              image.src = "";
          }
  
          temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
          description.innerHTML = `${json.weather[0].description}`;
          humidity.innerHTML = `${json.main.humidity}%`;
          wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
          infoSection.style = "display:flex;";
          infoSection.classList.add("slide-down");
          infoBox.classList.add("show-info");
        }
      });

    }
});

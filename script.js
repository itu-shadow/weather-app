async function getWeather() {
  const city = document.getElementById("city").value;

  if (!city) {
    document.getElementById("result").innerHTML = "Enter a valid city ⚠️";
    return;
  }

  const apiKey = "Your_openweathermap_api";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    document.getElementById("result").innerHTML = "Loading... ⏳";

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 404) {
      document.getElementById("result").innerHTML = "City not found ❌";
      return;
    }

    document.getElementById("result").innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Weather: ${data.weather[0].description}</p>
    `;

    // 🔥 CALL IMAGE FUNCTION
    changeBackground(city);

  } catch (error) {
    document.getElementById("result").innerHTML = "Error fetching data ⚠️";
  }
}
async function changeBackground(city) {
  const accessKey = "Your_unsplash_api";

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${city}&orientation=landscape&client_id=${accessKey}`
    );

    const data = await response.json();

    const imageUrl = data.urls.regular;

    document.body.style.backgroundImage = `url("${imageUrl}")`;

  } catch (error) {
    console.log("Image error:", error);

    document.body.style.backgroundImage = `url("https://picsum.photos/1600/900")`;
  }
}

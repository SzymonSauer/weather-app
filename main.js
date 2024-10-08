const btn = document.querySelector('button');
const cityInput = document.querySelector('.city-input');
const warn = document.querySelector('.warning');
const iconWeather = document.querySelector('.weather-icon');
const cityLabel1 = document.querySelector('.city-name');
const cityLabel2 = document.querySelector('.weather-city');
const temp = document.querySelector('.weather-temperature');
const press = document.querySelector('.weather-pressure');
const cities = /^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/;
const num = 60;

const selectCity = () => {
	if (cityInput.value.match(cities)) {
		cityLabel1.textContent = cityInput.value;
		cityLabel2.textContent = cityInput.value;

		cityLabel1.classList.add('visible');
		cityLabel2.classList.add('visible');
		temp.classList.add('visible');
		press.classList.add('visible');
		iconWeather.classList.add('visible');
	} else {
		warn.classList.add('visible');
		const warnRemoveVisbility = () => {
			warn.classList.remove('visible');
		};
		setTimeout(warnRemoveVisbility, 3000);
	}
};

const getWeather = () => {
	const API_KEY = '2e61945addc07abf00f36b0ad4d2e058';
	const cityName = cityInput.value;
	const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

	selectCity();

	axios
		.get(URL)
		.then((res) => {
			let temperatureValue = res.data.main.temp;
			let pressureValue = res.data.main.pressure;
			let idIcon = res.data.weather[0].icon;
			const WEATHER_ICON = `https://openweathermap.org/img/wn/${idIcon}@2x.png`;

			temp.textContent = temperatureValue.toFixed(1) + '℃';
			press.textContent = pressureValue + 'hPa';
			iconWeather.setAttribute('src', WEATHER_ICON);
		})
		.catch((error) => console.error(error));
};

btn.addEventListener('click', getWeather);
cityInput.addEventListener('keydown', (event) => {
	if (event.code === 'Enter') getWeather();
});

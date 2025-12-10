// icons
const weatherIcons = {
    "soleado": "sunny",
    "despejado": "sunny",
    "parcialmente nublado": "partly_cloudy_day",
    "nublado": "cloud",
    "cielo cubierto": "cloud",
    "neblina": "mist",
    "llovizna": "rainy_light",
    "ligeras lluvias": "rainy_light",
    "lluvia moderada": "rainy",
    "lluvia  moderada a intervalos": "rainy",
    "fuertes lluvias": "rainy",
    "tormenta": "thunderstorm",
};
const weatherColors = {
    "sunny": "#facc15",
    "nightlight": "#154a8fff",
    "partly_cloudy_day": "#eefcbcff", 
    "cloud": "#d2d2d2ff",           
    "mist": "#a9cdffff",          
    "rainy_light": "#2e8cffff",      
    "rainy": "#2e8cffff",      
    "thunderstorm": "#3c3942ff",
};

//weather
const API_KEY = "88122a2122ed42b3826163627252210";
const input = document.querySelector(".input-container input");
const cityName = document.querySelector(".weather-city");
const temperatureNumber = document.querySelector(".weather-temperature-number");
const weatherCurrent = document.querySelector(".weather-current");
const mainIcon = document.querySelector(".hourly-forecast-icon");
const hourlyContainer = document.querySelector(".hourly-forecast-container");
const dailyContainer = document.querySelector(".daily-forecast-container");

const suggestionsBox = document.createElement("div");
suggestionsBox.classList.add("suggestions-box");
document.querySelector(".input-container").appendChild(suggestionsBox);

suggestionsBox.style.position = "absolute";
suggestionsBox.style.background = "#fff";
suggestionsBox.style.width = "90%";
suggestionsBox.style.left = "50%";
suggestionsBox.style.transform = "translateX(-50%)";
suggestionsBox.style.borderRadius = "10px";
suggestionsBox.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
suggestionsBox.style.marginTop = "5px";
suggestionsBox.style.zIndex = "20";
suggestionsBox.style.overflow = "hidden";
suggestionsBox.style.display = "none";

let typingTimer;


let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
function renderFavorites() {
    const list = document.getElementById("favorites-list");
    list.innerHTML = "";

    favorites.forEach(city => {
        const div = document.createElement("div");
        div.classList.add("favorite-item");
        div.textContent = city;

        div.addEventListener("click", () => {
            loadWeather(city);
        });

        list.appendChild(div);
    });
}

input.addEventListener("input", () => {
    clearTimeout(typingTimer);

    const query = input.value.trim();

    if (query.length < 2) {
        suggestionsBox.style.display = "none";
        return;
    }

    typingTimer = setTimeout(() => fetchSuggestions(query), 300);
});

async function fetchSuggestions(query) {
    try {
        const url = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`;
        const res = await fetch(url);
        const data = await res.json();

        suggestionsBox.innerHTML = "";
        if (!data.length) {
            suggestionsBox.style.display = "none";
            return;
        }

        data.forEach(city => {
            const item = document.createElement("div");
            item.textContent = `${city.name}, ${city.country}`;
            item.style.padding = "10px 15px";
            item.style.cursor = "pointer";
            item.style.borderBottom = "1px solid #eee";
            item.style.fontSize = "15px";

            item.addEventListener("click", () => {
                input.value = city.name;
                suggestionsBox.style.display = "none";

                const enterEvent = new KeyboardEvent("keyup", { key: "Enter" });
                input.dispatchEvent(enterEvent);
            });

            item.addEventListener("mouseenter", () => {
                item.style.background = "#f2f2f2";
            });

            item.addEventListener("mouseleave", () => {
                item.style.background = "transparent";
            });

            suggestionsBox.appendChild(item);
        });

        suggestionsBox.style.display = "block";

    } catch (err) {
        console.error("Error en sugerencias", err);
        suggestionsBox.style.display = "none";
    }
}

input.addEventListener("keyup", async (e) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
        loadWeather(input.value.trim());
        suggestionsBox.style.display = "none";
    }
});

function convertToCityDate(dateString, timezone) {
    return new Date(
        new Date(dateString.replace(" ", "T")).toLocaleString("en-US", { timeZone: timezone })
    );
}

async function loadWeather(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=4&aqi=no&alerts=no&lang=es`;
    
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Ciudad no encontrada");

        const data = await res.json();
        const main = document.querySelector("main");
        main.classList.remove("hidden");
        main.classList.remove("fade-in");
        void main.offsetWidth;
        main.classList.add("fade-in");

        document.querySelector("main").classList.remove("hidden");

        cityName.textContent = data.location.name;
        temperatureNumber.textContent = data.current.temp_c;

        const condition = data.current.condition.text.toLowerCase();
        weatherCurrent.textContent = condition;

        const mainIconName = weatherIcons[condition] || "cloud";
        mainIcon.textContent = mainIconName;
        mainIcon.style.color = weatherColors[mainIconName] || "#ffffff";


        const timezone = data.location.tz_id;
        const nowInCity = new Date(
            new Date().toLocaleString("en-US", { timeZone: timezone })
        );
        const currentHour = nowInCity.getHours();
        const hours = data.forecast.forecastday[0].hour;
        const upcomingHours = hours
        .filter(h => {
            
            const hourString = h.time.split(" ")[1];
            const hourNumber = parseInt(hourString.split(":")[0], 10);
            return hourNumber >= currentHour;
        })
        .slice(0, 4);
        hourlyContainer.innerHTML = "";
        
        upcomingHours.forEach(hour => {
            const timeString = hour.time.split(" ")[1].slice(0, 5);
            const temp = hour.temp_c;
            const cond = hour.condition.text.toLowerCase();
            console.log("CONDICIÓN POR HORA:", cond);
            const icon = weatherIcons[cond] || "help";
            const color = weatherColors[icon] || "#ffffff";
            hourlyContainer.innerHTML += `
            <div class="hourly-forecast">
                <p class="hourly-forecast-time">${timeString}</p>
                <span class="hourly-forecast-icon icon filled" style="color: ${color}">${icon}</span>
                <p class="hourly-forecast-temperature">${temp}°C</p>
            </div>
            `;
        });
        
        const allDays = data.forecast.forecastday;
        const nextDays = allDays.slice(1, 3);
        console.log("forecastday:", allDays.map(d => d.date));
        
        dailyContainer.innerHTML = "";
        
        nextDays.forEach(day => {
            const [year, month, dayNum] = day.date.split("-").map(Number);
            const jsDate = new Date(year, month - 1, dayNum, 12, 0, 0);
            const dayName = jsDate
            .toLocaleDateString("es-AR", { weekday: "short" })
            .toUpperCase();

            const cond = day.day.condition.text.toLowerCase();
            console.log("CONDICIÓN DIARIA:", cond);
            const icon = weatherIcons[cond] || "help";
            const color = weatherColors?.[icon] || "#ffffff";

            dailyContainer.innerHTML += `
                <div class="daily-forecast">
                    <p class="daily-forecast-date">${dayNum}/${month}</p>
                    <p class="daily-forecast-day">${dayName}</p>
                    <span class="daily-forecast-icon icon filled" style="color:${color}">${icon}</span>
                    <p class="daily-forecast-temperature">${Math.round(day.day.maxtemp_c)}°</p>
                </div>
            `;
        });

        const favButton = document.getElementById("fav-button");
        
        if (favorites.includes(data.location.name)) {
            favButton.innerHTML = '<span class="icon filled">star</span>';
        } else {
            favButton.innerHTML = '<span class="icon">star</span>';
        }
        
        favButton.onclick = () => {
            const cityName = data.location.name;
            if (favorites.includes(cityName)) {
                favorites = favorites.filter(c => c !== cityName);
                favButton.innerHTML = '<span class="icon">star</span>';
            } else {
                favorites.push(cityName);
                favButton.innerHTML = '<span class="icon filled">star</span>';
            }
            localStorage.setItem("favorites", JSON.stringify(favorites));
            renderFavorites();
        };
    
    } catch (error) {
        console.error(error);
        cityName.textContent = "No encontrada";
        temperatureNumber.textContent = "";
        document.querySelector("main").classList.add("hidden");
    }
}
renderFavorites();

//backgrounds

const backgrounds = [
    "bg1",
    "bg2",
    "bg3",
    "bg4",
    "bg5"
];

const today = new Date().toDateString();
const saved = JSON.parse(localStorage.getItem("dailyBackground"));

let bgToUse;

if (saved && saved.date === today) {
    bgToUse = saved.image;
} else {
    bgToUse = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    localStorage.setItem(
        "dailyBackground",
        JSON.stringify({ date: today, image: bgToUse })
    );
}

document.body.style.setProperty(
    "--daily-bg",
    `url('assets/images/${bgToUse}.webp')`
);

/* CLIMA */

const input = document.querySelector("input");
const button = document.querySelector("button");

const place = document.querySelector("#place");
const degrees = document.querySelector("#degrees");
const img = document.querySelector("img");
const wind = document.querySelector("#wind");
const content = document.querySelector(".content");
const extrainfo = document.querySelector(".extrainfo");

button.addEventListener("click", () => {
  if (!input.value) return;

  getDataApi(input.value);
});

async function getDataApi(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&units=metric&appid=65a88254870591feae703f0d48d786b4`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data?.cod && data.cod === "404") {
        return alert("Local não encontrado!");
      }
      loadData(data);
    } else {
      throw new Error("Erro na requisição.");
    }
  } catch (error) {
    alert(error.message);
  }
}

function loadData(data) {
  const country = data.sys?.country ?? '';
  place.innerHTML = `${data.name}, ${country}`;
  degrees.innerHTML = `${Math.floor(data.main.temp)}° C`;
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  wind.innerHTML = `Vento: ${data.wind.speed} km/h`;
  content.style.display = "flex";
  extrainfo.style.display = "flex";
}


/* DATA ATUAL */

const dataAtual = new Date();
const dia = dataAtual.getDate();
const mes = dataAtual.getMonth() + 1;
const ano = dataAtual.getFullYear();
const dataFormatada = `${dia}/${mes}/${ano}`;

document.getElementById("data-atual").textContent = `Data: ${dataFormatada}`;

/*Ligh e Dark MODE */

const container = document.querySelector("#container");
const lightMode = document.getElementById("light-mode");
const darkMode = document.getElementById("dark-mode");

lightMode.addEventListener("change", () => {
  if (lightMode.checked) {
    container.style.backgroundColor = "#f7f7f7";
    container.style.color = "#000000";
  }
});

darkMode.addEventListener("change", () => {
  if (darkMode.checked) {
    container.style.backgroundColor = "#000000";
    container.style.color = "#f7f7f7";
    iconePesquisa.style.color = "#f7f7f7";
  }
});
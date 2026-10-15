const input = document.getElementById("temperature");
const from = document.getElementById("fromUnit");
const to = document.getElementById("toUnit");
const resultValue = document.getElementById("resultValue");
const resultUnit = document.getElementById("resultUnit");
const resultCaption = document.getElementById("resultCaption");
const error = document.getElementById("error");
const symbols = { C: "°C", F: "°F", K: "K" };
function toCelsius(v, unit) { if (unit === "C") return v; if (unit === "F") return (v - 32) * 5 / 9; return v - 273.15; }
function fromCelsius(v, unit) { if (unit === "C") return v; if (unit === "F") return v * 9 / 5 + 32; return v + 273.15; }
function fmt(v) { return Number(v.toFixed(2)).toLocaleString("en-US", { maximumFractionDigits: 2 }); }
function convertTemperature() {
  error.textContent = "";
  if (input.value.trim() === "" || !Number.isFinite(Number(input.value))) { error.textContent = "Please enter a valid temperature number."; input.focus(); return; }
  const value = Number(input.value), celsius = toCelsius(value, from.value);
  if (celsius < -273.15) { error.textContent = "Temperature cannot be below absolute zero (−273.15°C)."; return; }
  const converted = fromCelsius(celsius, to.value);
  resultValue.textContent = fmt(converted); resultUnit.textContent = symbols[to.value];
  resultCaption.textContent = `${fmt(value)} ${symbols[from.value]} is equal to ${fmt(converted)} ${symbols[to.value]}`;
}
document.getElementById("convert").addEventListener("click", convertTemperature);
input.addEventListener("keydown", e => { if (e.key === "Enter") convertTemperature(); });
from.addEventListener("change", () => { if (input.value.trim()) convertTemperature(); });
to.addEventListener("change", () => { if (input.value.trim()) convertTemperature(); });
document.getElementById("swap").addEventListener("click", () => { const old = from.value; from.value = to.value; to.value = old; convertTemperature(); });
document.querySelectorAll("[data-temp]").forEach(button => button.addEventListener("click", () => {
  input.value = button.dataset.temp; from.value = button.dataset.unit; to.value = button.dataset.unit === "C" ? "F" : "C"; convertTemperature();
  document.querySelector(".converter").scrollIntoView({ behavior: "smooth", block: "center" });
}));
convertTemperature();

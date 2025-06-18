const grid = document.getElementById("grid");
const versionEl = document.getElementById("version");
const latencyInput = document.getElementById("latency");
const errorInput = document.getElementById("error");
const latencyVal = document.getElementById("latencyValue");
const errorVal = document.getElementById("errorValue");
const cells = [];

for (let i = 0; i < 128; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  grid.appendChild(cell);
  cells.push(cell);
}

latencyInput.addEventListener("input", () => {
  latencyVal.textContent = (latencyInput.value / 1000).toFixed(1);
});

errorInput.addEventListener("input", () => {
  errorVal.textContent = errorInput.value;
});

latencyVal.textContent = (latencyInput.value / 1000).toFixed(1);
errorVal.textContent = errorInput.value;

let interval;

function start() {
  if (interval) return;
  interval = setInterval(() => {
    cells.forEach((cell) => {
      const errorChance = parseInt(errorInput.value);
      const isActive = Math.random() > 0.85;
      const isError = Math.random() * 100 < errorChance;
      cell.className = isActive ? "cell active" : "cell";
      if (isError) cell.className = "cell";
    });
  }, parseInt(latencyInput.value));
}

function stop() {
  clearInterval(interval);
  interval = null;
}

// Auto-start when page loads
window.onload = () => {
  start();
  fetch("/version")
    .then((res) => res.text())
    .then((text) => {
      versionEl.textContent = text;
    });
};

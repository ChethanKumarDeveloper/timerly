let totalSeconds = 720; // 12:00 default
let timerRunning = false;
let endTime = 0;
let selectedTemplate = "";

const home = document.getElementById("home");
const templateView = document.getElementById("templateView");
const timerDisplay = document.getElementById("timerDisplay");

const setBtn = document.getElementById("setBtn");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

const modal = document.getElementById("modal");

document.querySelectorAll(".template").forEach(t => {
  t.onclick = () => {
    selectedTemplate = t.dataset.template;
    applyTemplate();
    home.classList.add("hidden");
    templateView.classList.remove("hidden");
    updateDisplay();
  };
});

function applyTemplate() {
  if (selectedTemplate === "black") {
    document.body.style.background = "#000";
    document.body.style.color = "#fff";
  } else {
    document.body.style.background =
      "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470') center/cover";
    document.body.style.color = "#fff";
  }
}

/* SET TIME */
setBtn.onclick = () => modal.classList.remove("hidden");
document.getElementById("closeModal").onclick = () => modal.classList.add("hidden");

document.getElementById("applyTime").onclick = () => {
  const h = parseInt(h.value) || 0;
  const m = parseInt(m.value) || 0;
  const s = parseInt(s.value) || 0;

  totalSeconds = h * 3600 + m * 60 + s;
  if (totalSeconds <= 0) return alert("Invalid time");

  updateDisplay();
  modal.classList.add("hidden");
};

/* START */
startBtn.onclick = () => {
  if (timerRunning) return;
  timerRunning = true;
  endTime = Date.now() + totalSeconds * 1000;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  tick();
};

/* STOP */
stopBtn.onclick = () => {
  timerRunning = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

/* RESET */
resetBtn.onclick = () => {
  timerRunning = false;
  totalSeconds = 720; // back to 12:00
  startBtn.disabled = false;
  stopBtn.disabled = true;
  updateDisplay();
};

/* TIMER LOOP */
function tick() {
  if (!timerRunning) return;

  const remaining = Math.max(0, Math.round((endTime - Date.now()) / 1000));
  totalSeconds = remaining;
  updateDisplay();

  if (remaining > 0) {
    setTimeout(tick, 250);
  } else {
    timerRunning = false;
    startBtn.disabled = true;
    stopBtn.disabled = true;
    alert("Time's up!");
  }
}

function updateDisplay() {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  timerDisplay.textContent =
    `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}
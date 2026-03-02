let selectedTemplate = "";
let timerInterval;
let totalSeconds = 0;

const templates = document.querySelectorAll(".template");
const timerScreen = document.getElementById("timerScreen");
const templatesSection = document.getElementById("templates");
const timerDisplay = document.getElementById("timerDisplay");

templates.forEach(t => {
  t.addEventListener("click", () => {
    selectedTemplate = t.dataset.template;
    templatesSection.classList.add("hidden");
    timerScreen.classList.remove("hidden");
    applyTemplate();
  });
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

document.getElementById("startBtn").addEventListener("click", () => {
  const h = parseInt(hours.value) || 0;
  const m = parseInt(minutes.value) || 0;
  const s = parseInt(seconds.value) || 0;

  totalSeconds = h * 3600 + m * 60 + s;

  if (totalSeconds <= 0) return alert("Enter valid time");

  document.getElementById("inputs").style.display = "none";
  startCountdown();
});

function startCountdown() {
  updateDisplay();

  timerInterval = setInterval(() => {
    totalSeconds--;
    updateDisplay();

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
    }
  }, 1000);
}

function updateDisplay() {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  timerDisplay.textContent =
    `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const fullscreenBtn = document.getElementById("fullscreenBtn");

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullscreenBtn.textContent = "Exit Fullscreen";
  } else {
    document.exitFullscreen();
    fullscreenBtn.textContent = "Fullscreen";
  }
});
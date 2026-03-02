let totalSeconds = 720; // 12:00
let running = false;
let endTime = null;

const home = document.getElementById("home");
const template = document.getElementById("template");
const timerEl = document.getElementById("timer");
const modal = document.getElementById("modal");

/* TEMPLATE SELECTION */
document.querySelectorAll(".card").forEach(card => {
  card.onclick = () => {
    home.classList.add("hidden");
    template.classList.remove("hidden");

    if (card.dataset.template === "black") {
      document.body.style.background = "#000";
      document.body.style.color = "#fff";
    } else {
      document.body.style.background =
        "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470') center/cover";
      document.body.style.color = "#fff";
    }

    updateDisplay();
  };
});

/* SET */
document.getElementById("setBtn").onclick = () => {
  modal.classList.remove("hidden");
};

document.getElementById("applyBtn").onclick = () => {
  const h = +document.getElementById("h").value || 0;
  const m = +document.getElementById("m").value || 0;
  const s = +document.getElementById("s").value || 0;

  const value = h * 3600 + m * 60 + s;
  if (value <= 0) return;

  totalSeconds = value;
  running = false;
  endTime = null;

  modal.classList.add("hidden");
  updateDisplay();
};

/* START */
document.getElementById("startBtn").onclick = () => {
  if (running || totalSeconds <= 0) return;
  running = true;
  endTime = Date.now() + totalSeconds * 1000;
  tick();
};

/* END (PAUSE) */
document.getElementById("endBtn").onclick = () => {
  if (!running) return;
  running = false;
  totalSeconds = Math.max(0, Math.round((endTime - Date.now()) / 1000));
  endTime = null;
};

/* RESET */
document.getElementById("resetBtn").onclick = () => {
  running = false;
  endTime = null;
  totalSeconds = 720;
  updateDisplay();
};

/* TIMER LOOP */
function tick() {
  if (!running) return;

  totalSeconds = Math.max(0, Math.round((endTime - Date.now()) / 1000));
  updateDisplay();

  if (totalSeconds > 0) {
    requestAnimationFrame(() => setTimeout(tick, 200));
  } else {
    running = false;
  }
}

function updateDisplay() {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  timerEl.textContent =
    `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
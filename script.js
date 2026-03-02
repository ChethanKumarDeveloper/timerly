let totalSeconds = 720;
let running = false;
let endTime = null;

const home = document.getElementById("home");
const templatePage = document.getElementById("template");
const cards = document.getElementById("cards");
const timerEl = document.getElementById("timer");
const modal = document.getElementById("modal");

let activeTemplate = null;

/* RENDER HOME */
TEMPLATES.forEach(t => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.background =
    t.backgroundType === "color"
      ? t.backgroundValue
      : `url(${t.backgroundValue}) center/cover`;

  card.innerHTML = `
    <div class="preview">12:00</div>
    <button class="choose-btn">Use Template</button>
  `;

  card.onclick = () => openTemplate(t);
  cards.appendChild(card);
});

/* OPEN TEMPLATE */
function openTemplate(t) {
  activeTemplate = t;
  home.classList.add("hidden");
  templatePage.classList.remove("hidden");

  document.body.style.background =
    t.backgroundType === "color"
      ? t.backgroundValue
      : `url(${t.backgroundValue}) center/cover`;

  document.body.style.color = t.timerColor;

  document.querySelectorAll(".controls button").forEach(btn => {
    btn.style.background = t.buttonBg;
    btn.style.color = t.buttonColor;
  });

  resetTimer();
}

/* CONTROLS */
document.getElementById("setBtn").onclick = () =>
  modal.classList.remove("hidden");

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
  update();
};

document.getElementById("startBtn").onclick = () => {
  if (running) return;
  running = true;
  endTime = Date.now() + totalSeconds * 1000;
  tick();
};

document.getElementById("endBtn").onclick = () => {
  running = false;
  if (endTime) {
    totalSeconds = Math.max(
      0,
      Math.round((endTime - Date.now()) / 1000)
    );
  }
};

document.getElementById("resetBtn").onclick = resetTimer;

/* TIMER */
function tick() {
  if (!running) return;

  totalSeconds = Math.max(
    0,
    Math.round((endTime - Date.now()) / 1000)
  );
  update();

  if (totalSeconds > 0) {
    setTimeout(tick, 200);
  } else {
    running = false;
  }
}

function resetTimer() {
  running = false;
  endTime = null;
  totalSeconds = 720;
  update();
}

function update() {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  timerEl.textContent =
    `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
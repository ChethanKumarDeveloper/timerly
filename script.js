let totalSeconds = 720; // 12:00
let running = false;
let endTime = null;
let activeTemplate = null; // 🔒 REQUIRED

const home = document.getElementById("home");
const templatePage = document.getElementById("templatePage");
const cards = document.getElementById("cards");
const timerEl = document.getElementById("timer");
const modal = document.getElementById("modal");

/* RENDER HOME */
const colorContainer = document.getElementById("colorTemplates");
const imageContainer = document.getElementById("imageTemplates");

TEMPLATES.forEach(t => {
  const card = document.createElement("div");
  card.className = "card";

  if (t.backgroundType === "color") {
    card.style.background = t.backgroundValue;
  } else {
    card.style.background = `url(${t.backgroundValue}) center/cover`;
  }

  card.innerHTML = `
    <div class="preview">12:00</div>
    <button class="choose-btn">Use Template</button>
  `;

  card.onclick = () => openTemplate(t);

  if (t.backgroundType === "color") {
    colorContainer.appendChild(card);
  } else {
    imageContainer.appendChild(card);
  }
});

/* TEMPLATE SELECTION */
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
document.getElementById("setBtn").onclick = () => {
  if (!activeTemplate) return;
  modal.classList.add("show");
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

  modal.classList.remove("show");
  update();
};

/* START */
document.getElementById("startBtn").onclick = () => {
  if (!activeTemplate || running) return;
  running = true;
  endTime = Date.now() + totalSeconds * 1000;
  tick();
};

/* END (PAUSE) */
document.getElementById("endBtn").onclick = () => {
  if (!running) return;
  running = false;
  totalSeconds = Math.max(
    0,
    Math.round((endTime - Date.now()) / 1000)
  );
  endTime = null;
};

/* RESET */
document.getElementById("resetBtn").onclick = resetTimer;

/* TIMER LOOP */
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
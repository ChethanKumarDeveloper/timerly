let totalSeconds = 720;
let running = false;
let endTime = null;
let activeTemplate = null;
let hideTimeout = null;

const home = document.getElementById("home");
const templatePage = document.getElementById("templatePage");
const timerEl = document.getElementById("timer");
const controls = document.getElementById("controls");

const setModal = document.getElementById("setModal");
const donateModal = document.getElementById("donateModal");

const colorBox = document.getElementById("colorTemplates");
const imageBox = document.getElementById("imageTemplates");

/* RENDER TEMPLATES */
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
  (t.backgroundType === "color" ? colorBox : imageBox).appendChild(card);
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

/* SET TIME */
document.getElementById("setBtn").onclick = () => setModal.classList.add("show");

document.getElementById("applyBtn").onclick = () => {
  const h = +document.getElementById("h").value || 0;
  const m = +document.getElementById("m").value || 0;
  const s = +document.getElementById("s").value || 0;
  totalSeconds = h * 3600 + m * 60 + s || 720;
  setModal.classList.remove("show");
  update();
};

/* START */
document.getElementById("startBtn").onclick = async () => {
  if (running) return;

  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
  }

  running = true;
  endTime = Date.now() + totalSeconds * 1000;
  tick();
  startHideTimer();
};

/* FULLSCREEN BUTTON */
const fullscreenBtn = document.getElementById("fullscreenBtn");

/* FULLSCREEN BUTTON CLICK */
fullscreenBtn.onclick = async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
};

/* FULLSCREEN STATE LISTENER */
document.addEventListener("fullscreenchange", () => {

  if (document.fullscreenElement) {
    // Entered fullscreen
    document.body.classList.add("is-fullscreen");
    fullscreenBtn.textContent = "Exit Fullscreen";
  } else {
    // Exited fullscreen
    document.body.classList.remove("is-fullscreen");
    fullscreenBtn.textContent = "Fullscreen";

    controls.classList.remove("hidden-controls");
    document.documentElement.classList.remove("hide-cursor");
  }

});

/* TIMER */
function tick() {
  if (!running) return;
  totalSeconds = Math.max(0, Math.round((endTime - Date.now()) / 1000));
  update();
  if (totalSeconds > 0) setTimeout(tick, 200);
}

document.getElementById("endBtn").onclick = () => {
  running = false;
};

document.getElementById("resetBtn").onclick = resetTimer;

function resetTimer() {
  running = false;
  totalSeconds = 720;
  update();
}

function update() {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  timerEl.textContent =
    `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

/* AUTO HIDE CONTROLS */
function startHideTimer() {
  clearTimeout(hideTimeout);
  controls.classList.remove("hidden-controls");
  document.documentElement.classList.remove("hide-cursor");

  hideTimeout = setTimeout(() => {
    if (document.fullscreenElement) {
      controls.classList.add("hidden-controls");
      document.documentElement.classList.add("hide-cursor");
    }
  }, 3000);
}

document.addEventListener("mousemove", () => {
  if (document.fullscreenElement) startHideTimer();
});

document.addEventListener("touchstart", () => {
  if (document.fullscreenElement) startHideTimer();
});

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    document.body.classList.add("is-fullscreen");
  } else {
    document.body.classList.remove("is-fullscreen");
    controls.classList.remove("hidden-controls");
    document.documentElement.classList.remove("hide-cursor");
  }
});

/* DONATE */
document.querySelector(".donate").onclick = () =>
  donateModal.classList.add("show");

document.getElementById("closeDonate").onclick = () =>
  donateModal.classList.remove("show");
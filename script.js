let totalSeconds = 720; // 12:00
let running = false;
let endTime = 0;

const home = document.getElementById("home");
const template = document.getElementById("template");
const timerEl = document.getElementById("timer");
const modal = document.getElementById("modal");

document.querySelectorAll(".card").forEach(card => {
  card.onclick = () => {
    home.classList.add("hidden");
    template.classList.remove("hidden");

    if (card.dataset.template === "black") {
      document.body.style.background = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.background =
        "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470') center/cover";
      document.body.style.color = "white";
    }

    update();
  };
});

document.getElementById("setBtn").onclick = () => modal.classList.remove("hidden");

document.getElementById("apply").onclick = () => {
  const h = parseInt(document.getElementById("h").value) || 0;
  const m = parseInt(document.getElementById("m").value) || 0;
  const s = parseInt(document.getElementById("s").value) || 0;

  totalSeconds = h * 3600 + m * 60 + s;
  if (totalSeconds <= 0) return;

  modal.classList.add("hidden");
  update();
};

document.getElementById("startBtn").onclick = () => {
  if (running) return;
  running = true;
  endTime = Date.now() + totalSeconds * 1000;
  tick();
};

document.getElementById("endBtn").onclick = () => running = false;

document.getElementById("resetBtn").onclick = () => {
  running = false;
  totalSeconds = 720;
  update();
};

function tick() {
  if (!running) return;

  totalSeconds = Math.max(0, Math.round((endTime - Date.now()) / 1000));
  update();

  if (totalSeconds > 0) {
    setTimeout(tick, 250);
  }
}

function update() {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  timerEl.textContent =
    `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}
// ======= SETTINGS (edit these) =======
const SITE_PASSWORD = "SHEEN";  // change this
const QUESTION = "Will you be my Valentine?";
const FROM = "Dhruval";                 // or "" to hide

// ======= PASSWORD GATE =======
const lock = document.getElementById("lock");
const app = document.getElementById("app");
const pw = document.getElementById("pw");
const unlock = document.getElementById("unlock");
const err = document.getElementById("err");

function showApp() {
  lock.classList.add("hidden");
  app.classList.remove("hidden");
}

function tryUnlock() {
  if ((pw.value || "").trim() === SITE_PASSWORD) {
    sessionStorage.setItem("unlocked", "1");
    showApp();
  } else {
    err.textContent = "Wrong password 💔";
    pw.value = "";
    pw.focus();
  }
}

unlock.addEventListener("pointerdown", tryUnlock);
pw.addEventListener("keydown", (e) => {
  if (e.key === "Enter") tryUnlock();
});

if (sessionStorage.getItem("unlocked") === "1") showApp();

// ======= PERSONALIZE TEXT =======
document.getElementById("question").textContent = QUESTION;
document.getElementById("from").textContent = FROM ? `— from ${FROM}` : "";

// ======= INTERACTION (phone friendly) =======
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

let noCount = 0;
const noLines = ["No 😭", "Are you sure?", "Please 🥺", "Don’t do this 💔", "Come on 😭"];

noBtn.addEventListener("pointerdown", () => {
  noCount += 1;

  // Grow "Yes" gradually (smooth + capped)
  const scale = Math.min(1 + noCount * 0.14, 2.2);
  yesBtn.style.transform = `scale(${scale})`;

  noBtn.textContent = noLines[noCount % noLines.length];

  // Optional: move the No button a bit after a few taps
  if (noCount >= 3) {
    const dx = (Math.random() * 120) - 60;
    const dy = (Math.random() * 80) - 40;
    noBtn.style.transform = `translate(${dx}px, ${dy}px)`;
  }
});

yesBtn.addEventListener("pointerdown", () => {
  document.body.innerHTML = `
    <div style="
      min-height:100vh;
      display:grid;
      place-items:center;
      padding:24px;
      text-align:center;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      background: linear-gradient(135deg,#ffdee9,#b5fffc);
    ">
      <div style="
        background: rgba(255,255,255,.9);
        border-radius: 22px;
        padding: 26px;
        box-shadow: 0 22px 55px rgba(0,0,0,.18);
        width: min(520px, 92vw);
      ">
        <div style="font-size:44px; margin-bottom:10px;">💖 YAY 💖</div>
        <div style="font-size:22px;">You made my day.</div>
      </div>
    </div>
  `;
});


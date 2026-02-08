// Change this password (no spaces at the ends)
const SITE_PASSWORD = "SHEEN";

const lock = document.getElementById("lock");
const app = document.getElementById("app");
const pw = document.getElementById("pw");
const unlockBtn = document.getElementById("unlock");
const err = document.getElementById("err");

function normalize(s) {
  return (s ?? "").toString().trim(); // trims spaces on both ends
}

function showApp() {
  lock.classList.add("hidden");
  app.classList.remove("hidden");
}

function tryUnlock() {
  const entered = normalize(pw.value);
  const expected = normalize(SITE_PASSWORD);

  if (entered === expected) {
    sessionStorage.setItem("unlocked", "1");
    err.textContent = "";
    showApp();
  } else {
    err.textContent = "Wrong password 💔";
    pw.value = "";
    pw.focus();
  }
}

unlockBtn.addEventListener("pointerdown", tryUnlock);
pw.addEventListener("keydown", (e) => {
  if (e.key === "Enter") tryUnlock();
});

// stay unlocked on refresh (same tab)
if (sessionStorage.getItem("unlocked") === "1") showApp();

// ---- interaction (optional) ----
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

let noCount = 0;
const noLines = ["No 😭","Are you sure?","Please 🥺","Don’t do this 💔","Okay fine…?"];

noBtn.addEventListener("pointerdown", () => {
  noCount += 1;
  const scale = Math.min(1 + noCount * 0.14, 2.2);
  yesBtn.style.transform = `scale(${scale})`;
  noBtn.textContent = noLines[noCount % noLines.length];
});

yesBtn.addEventListener("pointerdown", () => {
  document.body.innerHTML = `
    <div style="min-height:100vh;display:grid;place-items:center;padding:24px;text-align:center;
      font-family:system-ui;background:linear-gradient(135deg,#ffdee9,#b5fffc);">
      <div style="background:#fff;border-radius:22px;padding:26px;box-shadow:0 22px 55px rgba(0,0,0,.18);
        width:min(520px,92vw);">
        <div style="font-size:44px;margin-bottom:10px;">💖 YAY 💖</div>
        <div style="font-size:22px;">You made my day.</div>
      </div>
    </div>
  `;
});

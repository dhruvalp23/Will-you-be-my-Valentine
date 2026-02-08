// =====================
// 🔐 PASSWORD CONFIG
// =====================
const SITE_PASSWORD = "SHEEN"; // CHANGE THIS

const lockScreen = document.getElementById("lock-screen");
const siteContent = document.getElementById("site-content");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const errorMsg = document.getElementById("errorMsg");

// Unlock logic
function unlockSite() {
  if (passwordInput.value === SITE_PASSWORD) {
    lockScreen.style.display = "none";
    siteContent.classList.remove("hidden");
    sessionStorage.setItem("unlocked", "true");
  } else {
    errorMsg.textContent = "Wrong password 💔";
    passwordInput.value = "";
  }
}

unlockBtn.addEventListener("click", unlockSite);
passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlockSite();
});

// Persist unlock on refresh
if (sessionStorage.getItem("unlocked") === "true") {
  lockScreen.style.display = "none";
  siteContent.classList.remove("hidden");
}

// =====================
// 💖 BUTTON INTERACTION
// =====================
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let noCount = 0;

noBtn.addEventListener("pointerdown", () => {
  noCount++;
  yesBtn.style.transform = `scale(${1 + noCount * 0.15})`;
  noBtn.textContent = ["No 😭", "Are you sure?", "Please 🥺", "Don’t do this 💔"][noCount % 4];
});

yesBtn.addEventListener("pointerdown", () => {
  document.body.innerHTML = `
    <div style="
      display:flex;
      align-items:center;
      justify-content:center;
      height:100vh;
      background:linear-gradient(135deg,#ffdee9,#b5fffc);
      text-align:center;
      font-size:32px;
      padding:20px;
    ">
      💖 YAY 💖<br><br>You made my day
    </div>
  `;
});

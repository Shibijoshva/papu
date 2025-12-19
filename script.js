/* ===== PAGE REFERENCES ===== */
const page0 = document.getElementById("page0");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

/* ===== BUTTONS ===== */
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const msg = document.getElementById("msg");

const countNext = document.getElementById("countNext");
const nextBtn = document.getElementById("nextBtn");
const endBtn = document.getElementById("endBtn");

/* ===== CELEBRATION ===== */
const cake = document.getElementById("cake");
const flame = document.getElementById("flame");
const blowText = document.getElementById("blowText");
const birthdayText = document.getElementById("birthdayText");
const balloonBox = document.getElementById("balloons");

/* ===== COUNTDOWN ===== */
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");
const countMsg = document.getElementById("countMsg");

/* ===== MUSIC ===== */
const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.5;

/* ===== STATE ===== */
let blown = false;

/* 🎂 BIRTHDAY FLAG (PERSISTENT) */
const birthdayDone = localStorage.getItem("birthdayDone");

/* ================= PAGE SWITCH ================= */
function showPage(p) {
  [page0, page1, page2, page3].forEach(pg =>
    pg.classList.remove("active")
  );
  p.classList.add("active");

  if (p === page2) {
    blown = false;
    cake.style.bottom = "35%";
    flame.style.display = "block";
    blowText.style.display = "block";
    birthdayText.classList.add("hidden");
    nextBtn.classList.add("hidden");

    bgMusic.currentTime = 0;
    bgMusic.play().catch(() => {});
  }

  if (p === page3) {
    bgMusic.pause();
  }
}

/* ================= COUNTDOWN (8:10 PM) ================= */
function startCountdown() {
  let target = new Date();

  // 🎯 NEXT 12:00 AM (MIDNIGHT)
  target.setDate(target.getDate() + 1);
  target.setHours(0, 0, 0, 0);

  const timer = setInterval(() => {
    const diff = target - new Date();

    if (diff <= 0) {
      clearInterval(timer);

      // 🎂 Save birthday state
      localStorage.setItem("birthdayDone", "true");

      hEl.textContent = "00";
      mEl.textContent = "00";
      sEl.textContent = "00";

      countMsg.innerHTML = "<strong>HAPPY BIRTHDAY 🎉🎂💖</strong>";
      countNext.classList.remove("hidden");
      return;
    }

    hEl.textContent = String(Math.floor(diff / 3600000)).padStart(2, "0");
    mEl.textContent = String(Math.floor(diff / 60000) % 60).padStart(2, "0");
    sEl.textContent = String(Math.floor(diff / 1000) % 60).padStart(2, "0");
  }, 1000);
}



/* ================= EVENTS ================= */
countNext.onclick = () => showPage(page1);
yesBtn.onclick = () => showPage(page2);
noBtn.onclick = () => (msg.textContent = "Don’t go 😞");

/* ================= BALLOONS ================= */
setInterval(() => {
  if (!page2.classList.contains("active")) return;

  const b = document.createElement("div");
  b.className = "balloon";
  b.style.left = Math.random() * 100 + "vw";
  b.style.top = "110vh";
  balloonBox.appendChild(b);

  b.animate(
    [{ transform: "translateY(0)" }, { transform: "translateY(-150vh)" }],
    { duration: 12000, easing: "linear" }
  );

  setTimeout(() => b.remove(), 14000);
}, 700);

/* ================= BLOW ACTION ================= */
page2.addEventListener("click", e => {
  if (e.target.closest("#nextBtn")) return;
  if (blown) return;

  blown = true;
  flame.style.display = "none";
  blowText.style.display = "none";

  cake.style.bottom = "-350px";

  setTimeout(() => birthdayText.classList.remove("hidden"), 900);
  setTimeout(() => nextBtn.classList.remove("hidden"), 1500);
});

/* ================= NEXT → PAGE 3 ================= */
nextBtn.addEventListener("click", e => {
  e.preventDefault();
  e.stopImmediatePropagation();
  showPage(page3);
});

/* ================= END ================= */
if (endBtn) {
  endBtn.onclick = () => showPage(page0);
}

/* ================= INITIAL LOAD ================= */
if (birthdayDone === "true") {
  // 🎉 Skip countdown forever after time
  showPage(page1);
} else {
  showPage(page0);
  startCountdown();
}

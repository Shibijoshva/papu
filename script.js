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

/* ===== MUSIC ===== */
const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.5;

/* ===== STATE ===== */
let blown = false;

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
showPage(page0);

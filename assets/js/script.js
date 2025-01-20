const $cards = document.querySelectorAll(".about-us__item");

function rotateToMouse(e) {
  const bounds = this.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const leftX = mouseX - bounds.x;
  const topY = mouseY - bounds.y;
  const center = {
    x: leftX - bounds.width / 2,
    y: topY - bounds.height / 2,
  };
  const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

  this.style.transform = `
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 2}deg
      )
    `;

  const glow = this.querySelector(".glow");
  if (glow) {
    glow.style.backgroundImage = `
      radial-gradient(
        circle at
        ${center.x * 2 + bounds.width / 2}px
        ${center.y * 2 + bounds.height / 2}px,
        #ffffff55,
        #0000000f
      )
    `;
  }
}

$cards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    const handleMouseMove = rotateToMouse.bind(this);

    document.addEventListener("mousemove", handleMouseMove);

    this.addEventListener(
      "mouseleave",
      function () {
        document.removeEventListener("mousemove", handleMouseMove);
        this.style.transform = "";
        const glow = this.querySelector(".glow");
        if (glow) {
          glow.style.backgroundImage = "";
        }
      },
      { once: true }
    );
  });
});

// shooting star
const shootingStar = document.querySelectorAll(".shooting-star");
shootingStar.forEach((element, index) => {
  const count = element.dataset.count;
  console.log(count);

  for (let i = 0; i < count; i++) {
    const leftValue = Math.random() * 60 + 10; // Zufallswert zwischen 10% und 70%
    const bottomValue = Math.random() * 30 + 80; // Zufallswert zwischen 80% und 110%
    const animationDelayValue = Math.random() * 15; // Zufallswert zwischen 0s und 45s

    // Neues Div-Element erstellen
    const speedLine = document.createElement("div");
    speedLine.className = "speed-line";
    speedLine.style.left = `${leftValue}%`;
    speedLine.style.bottom = `${bottomValue}%`;
    speedLine.style.animationDelay = `${animationDelayValue}s`;

    // Neues Element zum aktuellen Element hinzufügen
    element.appendChild(speedLine);
  }
});

document
  .querySelector(".banner-hero__content h2")
  .addEventListener("mousemove", (event) => {
    const textElement = event.currentTarget;
    const rect = textElement.getBoundingClientRect();

    // Tính toán vị trí chuột theo tỷ lệ phần trăm
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

    // Cập nhật background-position
    textElement.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  });

// Reset background-position khi chuột rời
document
  .querySelector(".banner-hero__content h2")
  .addEventListener("mouseleave", (event) => {
    const textElement = event.currentTarget;
    textElement.style.backgroundPosition = "center";
  });

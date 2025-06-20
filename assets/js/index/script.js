import { preloadImages } from "../../libs/utils.js";

function footer() {
  const canvas = document.getElementById("footerLine");
  if (!canvas) {
    console.warn("Canvas not found!");
    return;
  }

  const ctx = canvas.getContext("2d");

  // Set kích thước pixel cho canvas
  canvas.width = window.innerWidth;
  canvas.height = 50;

  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  ctx.strokeStyle = "#00FFFF";
  ctx.lineWidth = 3;
  ctx.beginPath();

  ctx.moveTo(0, 5); // điểm bắt đầu
  ctx.lineTo(w * 0.17, 5); // ngang phải
  ctx.lineTo(w * 0.19, 40); // gập xuống
  ctx.lineTo(w, 40); // ngang tới cuối

  ctx.stroke();
}

function magicCursor() {
  var circle = document.querySelector(".magic-cursor");

  gsap.set(circle, {
    xPercent: -50,
    yPercent: -50,
    opacity: 0
  });

  let mouseX = 0,
    mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.to(circle, {
      x: mouseX,
      y: mouseY,
      opacity: 1,
      duration: 0.1
    });
  });

  document.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget && !e.toElement) {
      // Chuột đã ra khỏi cửa sổ
      gsap.to(circle, {
        opacity: 0,
        duration: 0.2
      });
    }
  });

  document.addEventListener("mouseover", function () {
    gsap.to(circle, {
      opacity: 1,
      duration: 0.2
    });
  });

  const items = document.querySelectorAll("[data-cursor-text]");
  var cursorDot = document.querySelector(".magic-cursor .cursor");

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      cursorDot.classList.add("active");
    });

    item.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("active");
    });
  });
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  footer();
  magicCursor();
};
preloadImages("img").then(() => {
  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});

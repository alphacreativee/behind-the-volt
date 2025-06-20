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

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  footer();
};
preloadImages("img").then(() => {
  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});

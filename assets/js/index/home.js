import { preloadImages } from "../../libs/utils.js";

function ourService() {
  if ($(".our-services").length < 1) return;

  const cards = document.querySelectorAll(".our-services .card");
  cards.forEach((item) => {
    item.addEventListener("mousemove", startRotate);
    item.addEventListener("mouseout", stopRotate);
  });

  function startRotate(event) {
    const cardItem = this.querySelector(".card-item");
    const halfHeight = cardItem.offsetHeight / 2;
    const halfWidth = cardItem.offsetWidth / 2;

    cardItem.style.transform =
      "rotateX(" +
      -(event.offsetY - halfHeight) / 30 +
      "deg) rotateY(" +
      (event.offsetX - halfWidth) / 15 +
      "deg)";
  }

  function stopRotate(event) {
    const cardItem = this.querySelector(".card-item");
    cardItem.style.transform = "rotate(0)";
  }
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
};
preloadImages("img").then(() => {
  init();
  ourService();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});

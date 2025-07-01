import { preloadImages } from "../../libs/utils.js";

function pinEl() {
  gsap.registerPlugin(ScrollTrigger);

  const leftElement = document.querySelector(".pin-el-left");
  const rightElement = document.querySelector(".pin-el-right");
  const boxes = rightElement.querySelectorAll(".pin-el-box");
  const gapPerBox = 84;
  const totalGap = boxes.length > 1 ? boxes.length * gapPerBox : 0;
  const titles = leftElement.querySelectorAll(".pin-el-title");
  titles[0].classList.add("active");
  gsap.to(".pin-el-left", {
    scrollTrigger: {
      trigger: leftElement,
      start: "top 35%",
      end: () => {
        const scrollDistance = rightElement.offsetHeight - totalGap - 24;
        return "+=" + scrollDistance;
      },
      pin: true,
      //   markers: true,
      pinSpacing: false,
      onUpdate: (self) => {
        const progress = self.progress;
        const activeIndex = Math.floor(progress * boxes.length);
        const clampedIndex = Math.min(activeIndex, boxes.length - 1);
        titles.forEach((title, index) => {
          if (index === clampedIndex) {
            title.classList.add("active");
          } else {
            title.classList.remove("active");
          }
        });
      }
    }
  });

  $(".pin-el .pin-el-description .pin-el-line").each(function () {
    const canvas = this;
    const ctx = canvas.getContext("2d");

    const $parent = $(canvas).parent();
    const width = $parent[0].offsetWidth;
    const height = $parent[0].offsetHeight;
    const cornerHeight = height - 60;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(2, 0);
    ctx.lineTo(2, cornerHeight);
    ctx.lineTo(60, height - 2);
    ctx.lineTo(width, height - 2);
    ctx.stroke();
  });
}

function serviceDetail() {
  if ($(".service-detail").length < 1) return;

  $(".service-detail .item-line").each(function () {
    const canvas = this;
    const ctx = canvas.getContext("2d");

    const $parent = $(canvas).parent();
    const width = $parent[0].offsetWidth;
    const height = $parent[0].offsetHeight;
    const cornerHeight = height - 60;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(2, 0);
    ctx.lineTo(2, cornerHeight);
    ctx.lineTo(60, height - 2);
    ctx.lineTo(width, height - 2);
    ctx.stroke();
  });
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  pinEl();
  serviceDetail();
};
preloadImages("img").then(() => {
  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});

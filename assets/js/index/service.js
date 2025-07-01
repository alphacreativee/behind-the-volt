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
      },
    },
  });
}
const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  pinEl();
};
preloadImages("img").then(() => {
  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});

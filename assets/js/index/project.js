import { preloadImages } from "../../libs/utils.js";

function clipMaskImage() {
  if (!document.querySelector(".content-detail-clip-image")) return;
  gsap.fromTo(
    ".content-detail-clip-image .img-wrapper",
    {
      clipPath: "inset(0% 0% 0% 0%)",
    },
    {
      clipPath: () => {
        const viewportWidth = window.innerWidth;
        let targetWidth = viewportWidth - 160;
        if (viewportWidth < 991) {
          targetWidth = viewportWidth - 40;
        }

        const widthClipPercentage =
          ((viewportWidth - targetWidth) / 2 / viewportWidth) * 100;

        const image = document.querySelector(".content-detail-clip-image");
        const currentHeight = image.offsetHeight;
        const targetHeight =
          viewportWidth > 991 ? currentHeight - 100 : currentHeight;
        const heightClipPixels = (currentHeight - targetHeight) / 2;
        const heightClipPercentage = (heightClipPixels / currentHeight) * 100;

        return `inset(${heightClipPercentage}% ${widthClipPercentage}% ${heightClipPercentage}% ${widthClipPercentage}%)`;
      },
      duration: 0.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".content-detail-clip-image ",
        start: "top 70%",
        end: "bottom 70%",
        scrub: 1,
      },
    }
  );
  gsap.fromTo(
    ".content-detail-clip-image .img-wrapper img",
    {
      yPercent: -10,
    },
    {
      scrollTrigger: {
        trigger: ".content-detail-clip-image",
        start: "top 30%",
        end: "bottom 30%",
        scrub: 1,
        // markers: true,
      },
      yPercent: 10,
      duration: 0.4,
      ease: "power3.out",
    }
  );
}
function twoParallaxImage() {
  if (!document.querySelector(".content-detail-two-image")) return;

  gsap.fromTo(
    ".content-detail-two-image > .content-detail-col-img:nth-child(1) img",
    {
      yPercent: -10, // Bắt đầu cao hơn
    },
    {
      scrollTrigger: {
        trigger: ".content-detail-two-image",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        // markers: true,
      },
      yPercent: 10, // Kết thúc thấp hơn - di chuyển xuống chậm
      ease: "none",
    }
  );

  gsap.fromTo(
    ".content-detail-two-image > .content-detail-col-img:nth-child(2) img",
    {
      yPercent: 10,
    },
    {
      scrollTrigger: {
        trigger: ".content-detail-two-image",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      yPercent: -10,
      ease: "none",
    }
  );
}
const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  clipMaskImage();
  twoParallaxImage();
};
preloadImages("img").then(() => {
  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});

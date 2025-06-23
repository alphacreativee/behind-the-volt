import { preloadImages } from "../../libs/utils.js";

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
};
preloadImages("img").then(() => {
  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});

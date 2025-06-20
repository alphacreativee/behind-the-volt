import { preloadImages } from "../../libs/utils.js";
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
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
function animationText() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.utils.toArray(".effect-heading").forEach((heading) => {
    const splitText = new SplitText(heading, {
      type: "words, chars",
      charsClass: "char",
      wordsClass: "word",
    });

    gsap.fromTo(
      splitText.chars,
      {
        filter: "blur(10px)",
        y: 10,
        willChange: "filter, transform",
        opacity: 0,
        skewX: "-3deg",
      },
      {
        ease: "power3.out",
        filter: "blur(0px)",
        y: 0,
        skewX: "0deg",
        stagger: 0.05,
        opacity: 1,
        duration: 2,
        scrollTrigger: {
          trigger: heading,
          start: "top 60%",
        },
      }
    );
  });
  gsap.utils.toArray(".effect-description").forEach((description) => {
    const splitDescription = new SplitText(description, {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });
    gsap.fromTo(
      splitDescription.lines,
      {
        y: 40,
        willChange: "transform",
      },
      {
        y: 0,
        duration: 2,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: description,
          start: "top 60%",
        },
      }
    );
  });
  gsap.utils.toArray(".effect-fade-up").forEach((element) => {
    const start = parseFloat(element.dataset.start) || center;
    gsap.fromTo(
      element,
      {
        y: 20,
        opacity: 0,
        willChange: "transform",
      },
      {
        y: 0,
        duration: 1,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: `top ${start}%`,
        },
      }
    );
  });
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  animationText();
  footer();
};
preloadImages("img").then(() => {
  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});

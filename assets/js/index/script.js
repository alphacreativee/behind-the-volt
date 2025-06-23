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
  gsap.utils.toArray(".effect-karaoke").forEach((karaoke) => {
    const splitKaraoke = new SplitText(karaoke, {
      type: " chars",
      charsClass: "char",
    });
    gsap.to(splitKaraoke.chars, {
      color: "#00ffff",
      duration: 0.2,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: karaoke,
        start: "top 90%",
        end: "top 45%",
        // markers: true,
        scrub: true,
      },
    });
  });
}

function magicCursor() {
  var circle = document.querySelector(".magic-cursor");

  gsap.set(circle, {
    xPercent: -50,
    yPercent: -50,
    opacity: 0,
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
      duration: 0.1,
    });
  });

  document.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget && !e.toElement) {
      // Chuột đã ra khỏi cửa sổ
      gsap.to(circle, {
        opacity: 0,
        duration: 0.2,
      });
    }
  });

  document.addEventListener("mouseover", function () {
    gsap.to(circle, {
      opacity: 1,
      duration: 0.2,
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
function header() {
  const btnHambuger = document.querySelector(".header-hambuger");
  const headerMenu = document.querySelector(".header-menu");
  btnHambuger.addEventListener("click", () => {
    btnHambuger.classList.toggle("active");
    headerMenu.classList.toggle("active");
  });
  // effect scroll header

  gsap.to(".header", {
    scrollTrigger: {
      trigger: "body",
      start: "top+=100 top",
      toggleClass: { targets: ".header", className: "scrolled" },
      once: false,
    },
  });
}
const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  animationText();
  footer();
  magicCursor();
  header();
};
preloadImages("img").then(() => {
  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});

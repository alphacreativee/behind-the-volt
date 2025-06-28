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
  ctx.lineWidth = 2;
  ctx.beginPath();

  ctx.moveTo(0, 5); // điểm bắt đầu
  ctx.lineTo(w * 0.17, 5); // ngang phải
  ctx.lineTo(w * 0.19, 40); // gập xuống
  ctx.lineTo(w, 40); // ngang tới cuối

  ctx.stroke();
}

const splitTextInstances = [];
function animationText() {
  splitTextInstances.forEach((instance) => instance.revert());
  splitTextInstances.length = 0;

  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.utils.toArray(".effect-heading").forEach((heading) => {
    const splitText = new SplitText(heading, {
      type: "words, chars",
      charsClass: "char",
      wordsClass: "word"
    });
    splitTextInstances.push(splitText);

    gsap.fromTo(
      splitText.chars,
      {
        filter: "blur(10px)",
        y: 10,
        willChange: "filter, transform",
        opacity: 0,
        skewX: "-3deg"
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
          start: "top 60%"
        }
      }
    );
  });
  gsap.utils.toArray(".effect-description").forEach((description) => {
    const splitDescription = new SplitText(description, {
      type: "lines",
      linesClass: "line",
      mask: "lines"
    });
    splitTextInstances.push(splitDescription);

    gsap.fromTo(
      splitDescription.lines,
      {
        y: 40,
        willChange: "transform"
      },
      {
        y: 0,
        duration: 2,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: description,
          start: "top 60%"
        }
      }
    );
  });

  gsap.utils.toArray(".effect-fade-up").forEach((element) => {
    const start = parseFloat(element.dataset.start) || "50%";
    gsap.fromTo(
      element,
      {
        y: 20,
        opacity: 0,
        willChange: "transform"
      },
      {
        y: 0,
        duration: 1,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: `top ${start}%`
          // markers: true,
        }
      }
    );
  });
}
const splitTextInstancesAuto = [];
function animationTextAuto() {
  splitTextInstancesAuto.forEach((instance) => instance.revert());
  splitTextInstancesAuto.length = 0;

  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.utils.toArray(".effect-heading-auto").forEach((heading) => {
    const splitText = new SplitText(heading, {
      type: "words, chars",
      charsClass: "char",
      wordsClass: "word"
    });
    splitTextInstancesAuto.push(splitText);

    gsap.fromTo(
      splitText.chars,
      {
        filter: "blur(10px)",
        y: 10,
        willChange: "filter, transform",
        opacity: 0,
        skewX: "-3deg"
      },
      {
        ease: "power3.out",
        filter: "blur(0px)",
        y: 0,
        skewX: "0deg",
        stagger: 0.05,
        opacity: 1,
        duration: 2
      }
    );
  });
  gsap.utils.toArray(".effect-description-auto").forEach((description) => {
    const splitDescription = new SplitText(description, {
      type: "lines",
      linesClass: "line",
      mask: "lines"
    });
    splitTextInstancesAuto.push(splitDescription);

    gsap.fromTo(
      splitDescription.lines,
      {
        y: 40,
        willChange: "transform"
      },
      {
        y: 0,
        duration: 2,
        ease: "power3.out",
        stagger: 0.05
      }
    );
  });

  gsap.utils.toArray(".effect-fade-up-auto").forEach((element) => {
    r;
    gsap.fromTo(
      element,
      {
        y: 20,
        opacity: 0,
        willChange: "transform"
      },
      {
        y: 0,
        duration: 1,
        opacity: 1,
        ease: "power3.out",
        delay: 1.5
      }
    );
  });
}

function animateTextKaraoke() {
  if ($(".effect-karaoke").length < 1) return;

  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.utils.toArray(".effect-karaoke").forEach((karaoke) => {
    const splitKaraoke = new SplitText(karaoke, {
      type: "words, chars",
      wordsClass: "word",
      charsClass: "char"
    });

    gsap.to(splitKaraoke.chars, {
      color: "#00ffff",
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: karaoke,
        start: "top 90%",
        end: "top 30%",
        // markers: true,
        scrub: true
      }
    });
  });
}

function animation() {
  gsap.utils.toArray(".parallax-trigger").forEach((container) => {
    const img = container.querySelector("img");
    if (!img) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scrub: true,
        pin: false
        // markers: true
      }
    });

    tl.fromTo(
      img,
      {
        yPercent: -10,
        ease: "none"
      },
      {
        yPercent: 10,
        ease: "none"
      }
    );
  });
}

function magicCursor() {
  var circle = document.querySelector(".magic-cursor");
  document.addEventListener("click", (e) => {
    circle.classList.add("scale-in");
    setTimeout(() => {
      circle.classList.remove("scale-in");
    }, 500);
  });
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

  const items = document.querySelectorAll("[data-cursor-text],a[href]");
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
  const menuSub = document.querySelector("li.menu-item-has-children");
  btnHambuger.addEventListener("click", () => {
    btnHambuger.classList.toggle("active");
    headerMenu.classList.toggle("active");
  });
  document.addEventListener("click", (e) => {
    if (!btnHambuger.contains(e.target) && !headerMenu.contains(e.target)) {
      btnHambuger.classList.remove("active");
      headerMenu.classList.remove("active");
    }
  });
  // mouseenter
  menuSub.addEventListener("mouseenter", () => {
    menuSub.classList.add("active");
  });
  // effect scroll header

  gsap.to(".header", {
    scrollTrigger: {
      trigger: "body",
      start: "top+=100 top",
      toggleClass: { targets: ".header", className: "scrolled" },
      once: false
    }
  });
}

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

  function consultancy() {
    $(".consultancy .item").on("click", function () {
      const item = $(this);
      if (item.hasClass("active")) return;

      $(".consultancy .item").removeClass("active");
      item.addClass("active");

      setTimeout(() => {
        animationText();
        // ScrollTrigger.refresh(true);
      }, 500);
    });
  }
  consultancy();
}
function bannerParallax() {
  const bannerImg = document.querySelector(".banner picture img");

  gsap.to(bannerImg, {
    scrollTrigger: {
      trigger: ".banner",
      start: "top top",
      end: "bottom 30%",
      scrub: 1
      // markers: true,
    },
    ease: "power3.out",
    yPercent: -5
  });
}
const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  animationText();
  animateTextKaraoke();
  footer();
  bannerParallax();
  animationTextAuto();
  magicCursor();
  header();
  ourService();
  animation();
  ScrollTrigger.refresh(true);
};
preloadImages("img").then(() => {
  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});

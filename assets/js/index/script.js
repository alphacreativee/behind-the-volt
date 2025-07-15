import { preloadImages } from "../../libs/utils.js";
("use strict");
$ = jQuery;

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
function handlePageVisibilityAndFavicon() {
  const originalTitle = document.title;
  let faviconInterval;
  let isBlinking = false;

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      document.title = "Behind The Volt";
      startFaviconBlinking();
    } else {
      document.title = originalTitle;
      stopFaviconBlinking();
    }
  });

  function changeFavicon(src) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml"; // Thêm MIME type cho SVG
      document.head.appendChild(link);
    }
    link.href = `${src}?v=${new Date().getTime()}`;
  }

  function startFaviconBlinking() {
    if (isBlinking) return; // Tránh chạy nhiều interval

    isBlinking = true;
    const hostname = window.location.origin;

    const favicons = [
      `${hostname}/wp-content/themes/btv/assets/images/use/favicon-black.svg`,
      `${hostname}/wp-content/themes/btv/assets/images/use/favicon-blue.svg`,
      `${hostname}/wp-content/themes/btv/assets/images/use/favicon-white.svg`
    ];
    let faviconIndex = 0;

    faviconInterval = setInterval(() => {
      changeFavicon(favicons[faviconIndex]);
      faviconIndex = (faviconIndex + 1) % favicons.length;
    }, 500);
  }

  function stopFaviconBlinking(assestUrl) {
    clearInterval(faviconInterval);
    isBlinking = false;
    const hostname = window.location.origin;
    changeFavicon(
      `${hostname}/wp-content/themes/btv/assets/images/use/favicon-white.svg`
    );
  }
}
document.addEventListener("DOMContentLoaded", () => {
  handlePageVisibilityAndFavicon();
});
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

  if (window.innerWidth > 991) {
    ctx.lineTo(w * 0.19, 40); // gập xuống
  } else {
    ctx.lineTo(w * 0.25, 40); // gập xuống
  }
  ctx.lineTo(w, 40); // ngang tới cuối

  ctx.stroke();
}

const splitTextInstances = [];
function animationText() {
  splitTextInstances.forEach((instance) => instance.revert());
  splitTextInstances.length = 0;

  gsap.registerPlugin(ScrollTrigger, SplitText);

  gsap.utils.toArray(".effect-heading").forEach((heading) => {
    const dataStartHeading = heading.dataset.start || "60%";
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
    const img = container.querySelector("img, video");
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

  gsap.utils.toArray(".fade-in-img").forEach((img) => {
    gsap.fromTo(
      img,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: img,
          start: "top 50%",
          end: "bottom 30%"
          // markers: true,
        }
      }
    );
  });

  gsap.utils.toArray(".effect-fade-in").forEach((element) => {
    let posOffset = element.getAttribute("data-start") || "70%";
    let dataDelay = element.getAttribute("data-delay") || "0";

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: dataDelay,
        ease: "power1.out",
        scrollTrigger: {
          trigger: element,
          start: `top ${posOffset}`,
          end: `bottom ${posOffset}`
          // toggleActions: "play none none reverse"
          // markers: true
        }
      }
    );
  });
}

function magicCursor() {
  if (window.innerWidth < 991) return;
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
  // animation item text menu
  let tl = gsap.timeline({ paused: true });

  tl.from(".header-menu-container > ul > li", {
    y: 50,
    opacity: 0,
    filter: "blur(10px)",
    stagger: 0.1,
    duration: 1,
    ease: "power2.out"
  });
  btnHambuger.addEventListener("click", () => {
    if (headerMenu.classList.contains("active")) {
      btnHambuger.classList.remove("active");
      tl.reverse();
      setTimeout(() => {
        headerMenu.classList.remove("active");
        headerMenu.classList.add("closing");
      }, 1500);

      setTimeout(() => {
        headerMenu.classList.remove("closing");
      }, 1000);
    } else {
      btnHambuger.classList.add("active");
      headerMenu.classList.add("active");

      headerMenu.classList.remove("closing");
      setTimeout(() => {
        tl.restart();
      }, 1000);
    }
  });
  if (btnHambuger && headerMenu) {
    document.addEventListener("click", (e) => {
      if (
        !btnHambuger.contains(e.target) &&
        !headerMenu.contains(e.target) &&
        headerMenu.classList.contains("active")
      ) {
        btnHambuger.classList.remove("active");

        menuSub.classList.remove("active");

        tl.reverse();
        setTimeout(() => {
          headerMenu.classList.remove("active");
          headerMenu.classList.add("closing");
        }, 1500);
        setTimeout(() => {
          headerMenu.classList.remove("closing");
        }, 1000);
      }
    });
  }
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
  if (window.innerWidth > 992) {
    function consultancy() {
      $(".consultancy .item").on("mouseenter", function () {
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

  if ($(".our-services .card").length < 1) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".our-services .card", {
    yPercent: 20,
    opacity: 0,
    rotate: 10,
    duration: 0.9,
    ease: "power2.out",
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".our-services .services-list",
      start: "top 60%",
      toggleActions: "play none none none"
      // markers: true
    }
  });

  const $cards = document.querySelectorAll(".our-services .card");

  $cards.forEach(($card) => {
    let bounds;

    function rotateToMouse(e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;

      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      };

      const $glow = $card.querySelector(".glow");
      if ($glow) {
        $glow.style.backgroundImage = `
        radial-gradient(
          circle at
          ${center.x * 2 + bounds.width / 2}px
          ${center.y * 2 + bounds.height / 2}px,
          #00ffff4D,
          #1c1c1c
        )
      `;
      }
    }

    $card.addEventListener("mouseenter", () => {
      bounds = $card.getBoundingClientRect();
      document.addEventListener("mousemove", rotateToMouse);
    });

    $card.addEventListener("mouseleave", () => {
      document.removeEventListener("mousemove", rotateToMouse);

      const $glow = $card.querySelector(".glow");
      if ($glow) {
        $glow.style.backgroundImage = `
        radial-gradient(
          circle at 50% -20%,
          #1c1c1c,
          #1c1c1c
        )
      `;
      }
    });
  });
}
function bannerParallax() {
  const bannerImg = document.querySelector(".banner picture img");

  gsap.set(bannerImg, {
    transformOrigin: "center center",
    force3D: true
  });

  gsap.to(bannerImg, {
    scrollTrigger: {
      trigger: ".banner",
      start: "top top",
      end: "bottom 30%",
      scrub: 1,
      refreshPriority: 1
    },
    ease: "power3.out",
    yPercent: 5,
    scale: 1.1,
    force3D: true
  });
}
function particleEffect() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  const particles = Array.from({ length: 200 }, () => new Particle());

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    particles.forEach((p1, i) => {
      // particles.slice(i + 1).forEach((p2) => {
      //   const dx = p1.x - p2.x;
      //   const dy = p1.y - p2.y;
      //   const distance = Math.sqrt(dx * dx + dy * dy);

      //   if (distance < 100) {
      //     ctx.beginPath();
      //     ctx.strokeStyle = `rgba(255, 255, 255, ${
      //       0.1 * (1 - distance / 100)
      //     })`;
      //     ctx.lineWidth = 0.5;
      //     ctx.moveTo(p1.x, p1.y);
      //     ctx.lineTo(p2.x, p2.y);
      //     ctx.stroke();
      //   }
      // });

      const dx = p1.x - mouseX;
      const dy = p1.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        const force = (150 - distance) / 150;

        p1.x += Math.cos(angle) * force * 2;
        p1.y += Math.sin(angle) * force * 2;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}
function effectImgParallaxAndMove() {
  gsap.utils.toArray(".img-move-parallax").forEach((imgWrapper) => {
    const img = imgWrapper.querySelector("img");
    const isReverse = imgWrapper.classList.contains("move-reverse");
    const xPercentValue = isReverse ? -50 : 50;
    gsap.set(imgWrapper, {
      xPercent: xPercentValue,
      autoAlpha: 0
    });
    gsap.set(img, {
      yPercent: -15,
      scale: 1.35
    });

    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: imgWrapper,
        start: "top 50%",
        end: "center 50%"
        // markers: true,
      }
    });
    tl1.to(imgWrapper, {
      xPercent: 0,
      autoAlpha: 1,
      duration: 1.5,
      ease: "power3.out"
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: imgWrapper,
        start: "center 70%",
        end: "bottom 20%",
        // markers: true,
        scrub: 1
      }
    });
    tl2.to(img, {
      yPercent: 10,
      scale: 1.2
    });
  });
}
function formCard() {
  const forms = document.querySelectorAll(".contact-form");
  if (!forms.length) return;
  document
    .querySelector(".contact-right")
    .addEventListener("mousemove", (e) => {
      forms.forEach((card) => {
        const rect = card.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });
}

function fadeTextFooter() {
  gsap.set("data-text-footer", {
    opacity: 0,
    y: 20
  });
  let tlf = gsap.timeline({ paused: true });

  tlf.fromTo(
    "[data-text-footer]",
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out"
    }
  );
  ScrollTrigger.create({
    trigger: "footer",
    start: "top 80%",
    // markers: true,
    animation: tlf,
    toggleActions: "play none none none"
  });

  return tlf;
}

function modalVideoHighLight() {
  const btvModal = document.getElementById("btvHighlight");

  if (!btvModal) return;

  const video = btvModal.querySelector("video");

  btvModal.addEventListener("shown.bs.modal", function () {
    if (video) {
      video.muted = false;
      video.currentTime = 0;
      video.play();
    }
  });

  btvModal.addEventListener("hidden.bs.modal", function () {
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }
  });

  const btnHighlight = document.getElementById("btnModalHighlight");
  const footer = document.getElementById("footer");

  if (btnHighlight && footer) {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: footer,
      start: "top bottom",
      // markers: true,
      onEnter: () => {
        gsap.to(btnHighlight, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.4,
          ease: "none"
        });
      },
      onLeaveBack: () => {
        gsap.to(btnHighlight, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.4,
          ease: "none"
        });
      }
    });
  }
}
function moveDots() {
  const dotPatternCards = document.querySelectorAll(".dot-pattern");

  dotPatternCards.forEach((card) => {
    const overlay = card.querySelector(".dot-overlay");
    const dotSpacing = 12; // tăng khoảng cách để giảm số lượng dot
    let dots = [];

    // Ham tao dot grid
    function createDots() {
      overlay.innerHTML = "";
      dots = [];

      const rect = card.getBoundingClientRect();
      for (let x = dotSpacing; x < rect.width; x += dotSpacing) {
        for (let y = dotSpacing; y < rect.height; y += dotSpacing) {
          const dot = document.createElement("div");
          dot.className = "interactive-dot";

          // Đặt vị trí ban đầu bằng transform translate
          dot.style.transform = `translate(${x}px, ${y}px) scale(1)`;
          dot.style.opacity = "0.4";
          overlay.appendChild(dot);

          dots.push({
            element: dot,
            originalX: x,
            originalY: y,
            currentX: x,
            currentY: y
          });
        }
      }
    }

    createDots();

    let isHovering = false;
    let mouseX = 0;
    let mouseY = 0;
    let animationFrameId;

    function updateDots() {
      dots.forEach((dot) => {
        const dx = mouseX - dot.originalX;
        const dy = mouseY - dot.originalY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          const force = Math.max(0, 1 - distance / 80);
          const attraction = force * 15;

          const angle = Math.atan2(dy, dx);
          dot.currentX = dot.originalX + Math.cos(angle) * attraction;
          dot.currentY = dot.originalY + Math.sin(angle) * attraction;
          const scale = 1 + force * 1.5;
          const opacity = 0.4 + force * 0.6;

          // Dùng transform translate và scale để tránh layout, repaint nhiều
          dot.element.style.transform = `translate(${dot.currentX}px, ${dot.currentY}px) scale(${scale})`;
          dot.element.style.opacity = opacity;
          dot.element.classList.add("moving");
        } else {
          dot.currentX = dot.originalX;
          dot.currentY = dot.originalY;
          dot.element.style.transform = `translate(${dot.originalX}px, ${dot.originalY}px) scale(1)`;
          dot.element.style.opacity = "0.4";
          dot.element.classList.remove("moving");
        }
      });
      animationFrameId = null;
    }

    function handleMouseMove(e) {
      const rect = card.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateDots);
      }
    }

    card.addEventListener("mouseenter", () => {
      isHovering = true;
    });

    card.addEventListener("mousemove", handleMouseMove);

    card.addEventListener("mouseleave", () => {
      isHovering = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      // Reset all dots về vị trí ban đầu
      dots.forEach((dot) => {
        dot.element.style.transform = `translate(${dot.originalX}px, ${dot.originalY}px) scale(1)`;
        dot.element.style.opacity = "0.4";
        dot.element.classList.remove("moving");
        dot.currentX = dot.originalX;
        dot.currentY = dot.originalY;
      });
    });

    // debounce hàm resize để tránh gọi nhiều lần liên tục
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!isHovering) {
          createDots();
        }
      }, 200);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  bannerParallax();
});

function contactForm() {
  if ($(".contact-form").length < 1) return;

  const contactForm = $("#contact-form");
  const nameField = contactForm.find("input[name='name']");
  const emailField = contactForm.find("input[name='email']");
  const phoneField = contactForm.find("input[name='phone']");
  const checkbox = contactForm.find("#terms");
  const messageField = contactForm.find("textarea[name='message']");
  const buttonSubmit = contactForm.find("button[type='submit']");

  function toggleSubmitButton() {
    if (checkbox.is(":checked")) {
      buttonSubmit.prop("disabled", false);
    } else {
      buttonSubmit.prop("disabled", true);
    }
  }
  checkbox.on("change", toggleSubmitButton);

  contactForm.on("submit", function (e) {
    e.preventDefault();

    contactForm.find("input, textarea").removeClass("error");

    let isValid = true;

    if (!nameField.val().trim()) {
      nameField.addClass("error");
      isValid = false;
    }

    if (!emailField.val().trim()) {
      emailField.addClass("error");
      isValid = false;
    }

    if (!phoneField.val().trim()) {
      phoneField.addClass("error");
      isValid = false;
    }

    if (!checkbox.is(":checked")) {
      isValid = false;
    }

    if (!isValid) return;

    $.ajax({
      type: "POST",
      url: ajaxUrl,
      data: {
        action: "submit_contact_form",
        name: nameField.val().trim(),
        email: emailField.val().trim(),
        phone: phoneField.val().trim(),
        messageNote: messageField.val().trim()
      },
      beforeSend: function () {
        buttonSubmit.addClass("aloading");
      },
      success: function (res) {
        contactForm[0].reset();
        toggleSubmitButton();

        if (contactForm.find(".form-checked-container").length > 0) {
          // contactForm.find(".form-checked-container").hide();
          contactForm.find(".success-message").show();

          setTimeout(function () {
            // contactForm.find(".form-checked-container").show();
            contactForm.find(".success-message").hide();
          }, 8000);
        }

        buttonSubmit.removeClass("aloading");
      },
      error: function (xhr, status, error) {
        console.error("Lỗi khi gửi form:", error);
      }
    });
  });
}

function getNewletter() {
  $("#form-newletter").on("submit", function (e) {
    e.preventDefault();

    const thisForm = $(this);
    const emailField = thisForm.find("input[type='email']");
    const buttonSubmit = thisForm.find("button[type='submit']");
    const messageBox = thisForm.siblings(".newsletter-message");

    emailField.removeClass("error");
    messageBox.removeClass("success error").text("").hide();

    if (!emailField.length) {
      console.error("Không tìm thấy input email trong form.");
      return;
    }

    const email = emailField.val() ? emailField.val().trim() : "";

    if (!email) {
      emailField.addClass("error");
      showNewsletterMessage(messageBox, "Please enter your email.", false);
      return;
    }

    $.ajax({
      type: "POST",
      url: ajaxUrl,
      data: {
        action: "btv_receive_newletter",
        email: email
      },
      beforeSend: function () {
        buttonSubmit.addClass("aloading");
        messageBox.removeClass("success error").text("").hide();
      },
      success: function (res) {
        buttonSubmit.removeClass("aloading");

        if (res.status === true) {
          thisForm[0].reset();
          showNewsletterMessage(messageBox, res.message, true);
        } else {
          emailField.addClass("error");
          showNewsletterMessage(messageBox, res.message, false);
        }

        // Ẩn message sau 5 giây (không dùng fade)
        setTimeout(() => {
          messageBox.hide();
        }, 8000);
      },
      error: function () {
        buttonSubmit.removeClass("aloading");
        showNewsletterMessage(
          messageBox,
          "An error occurred. Please try again later.",
          false
        );
      }
    });
  });

  function showNewsletterMessage(el, message, isSuccess) {
    el.removeClass("success error")
      .addClass(isSuccess ? "success" : "error")
      .text(message)
      .show();
  }
}

function loadBTV() {
  if ($(".banner-word").length < 1 && $("#btnModalHighlight").length < 1)
    return;

  gsap.to(".banner-word", {
    autoAlpha: 1,
    duration: 1,
    ease: "power3.out"
    // delay: 1
  });
  gsap.set("#btnModalHighlight", {
    xPercent: 50
  });
  gsap.to("#btnModalHighlight", {
    xPercent: 0,
    autoAlpha: 1
    // delay: 0.3
  });
  if (window.innerWidth < 991) {
    const button = document.querySelector("#btnModalHighlight");

    gsap.set(button, {
      x: 0,
      autoAlpha: 1
    });
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (self.direction === 1) {
          // Cuộn xuống - ẩn button
          gsap.to(button, {
            x: 10,
            autoAlpha: 0,

            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          // Cuộn lên - hiện button
          gsap.to(button, {
            x: 0,
            autoAlpha: 1,

            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    });
  }
}

function hideLoadingTransition() {
  const logo = document.querySelector("#loading-transition .logo");
  const panels = document.querySelectorAll("#loading-transition .loader-panel");

  const minDuration = 0.8;
  const maxDuration = 2.0;
  const total = panels.length;

  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

  tl.to(logo, {
    opacity: 0,
    duration: 0.8,
    onComplete: () => logo.remove()
  });

  // Animate panels
  panels.forEach((panel, index) => {
    const scaleYDuration =
      minDuration + (maxDuration - minDuration) * (index / (total - 1));
    const scaleXDuration = 0.8;
    const delay = 0.5 + index * 0.05;

    if (index >= total - 1) {
      const triggerTime = delay + 0.15 + scaleYDuration - 1;

      tl.to(
        panel,
        {
          scaleX: 0,
          opacity: 0.7,
          duration: scaleXDuration,
          transformOrigin: "center"
        },
        delay
      );

      tl.add(() => loadBTV(), triggerTime);
    } else {
      tl.to(
        panel,
        {
          scaleX: 0,
          opacity: 0.7,
          duration: scaleXDuration,
          transformOrigin: "center"
        },
        delay
      ).to(
        panel,
        {
          scaleY: 0,
          duration: scaleYDuration,
          transformOrigin: "center"
        },
        delay + 0.15
      );
    }
  });

  tl.set("#loading-transition", { display: "none" });
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    hideLoadingTransition();
  }, 500);
});

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  // moveDots();
  animationText();
  formCard();
  particleEffect();
  animateTextKaraoke();
  footer();
  animationTextAuto();
  magicCursor();
  header();
  ourService();
  animation();
  effectImgParallaxAndMove();
  fadeTextFooter();
  modalVideoHighLight();
  contactForm();
  getNewletter();
  ScrollTrigger.refresh(true);
};
preloadImages("img").then(() => {
  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});
function updateProgressBar() {
  const progressBar = document.querySelector(".progress-bar");
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (window.pageYOffset / totalHeight) * 100;
  progressBar.style.height = progress + "%";

  progressBar.style.boxShadow = " 0 2px 10px 1px #00ffff";

  clearTimeout(progressBar.dataset.scrollTimeout);
  progressBar.dataset.scrollTimeout = setTimeout(() => {
    progressBar.style.boxShadow = "none";
  }, 300);
}

updateProgressBar();
window.addEventListener("scroll", updateProgressBar);
window.addEventListener("resize", updateProgressBar);

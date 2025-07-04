import { preloadImages } from "../../libs/utils.js";

function sectionAbout() {
  const wrappers = document.querySelectorAll(".horizontal-cards");

  if (!wrappers.length) return;

  wrappers.forEach((wrapper, index) => {
    const about = wrapper.querySelector(".horizontal-cards .list-item");
    if (!about) return;

    const getScrollAmount = () => {
      const racesWidth = about.scrollWidth;

      const addScrollHeight = window.innerWidth < 1600 ? 80 : 0;
      return racesWidth - window.innerWidth + addScrollHeight;
    };

    const createTween = (element, scrollAmount) => {
      return gsap.to(element, {
        x: -scrollAmount,
        duration: 3,
        ease: "none"
      });
    };

    const getTotalHeight = () => {
      const items = wrapper.querySelectorAll(".horizontal-cards .card-item");
      return Array.from(items).reduce((acc, el) => acc + el.offsetHeight, 0);
    };

    const updateSpacer = (scrollAmount) => {
      let spacer = wrapper.nextElementSibling;
      if (!spacer || !spacer.classList.contains("horizontal-spacer")) {
        spacer = document.createElement("div");
        spacer.classList.add("horizontal-spacer");
        wrapper.insertAdjacentElement("afterend", spacer);
      }
      const totalHeight = getTotalHeight();
      spacer.style.height = `${scrollAmount}px`;
    };

    const createScrollTrigger = (wrapper, tween, scrollAmount) => {
      const isDesktop = window.innerWidth > 991;
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 20%",
        end: `+=${scrollAmount}`,
        pin: isDesktop,
        animation: tween,
        scrub: 1,
        pinSpacing: false,
        // invalidateOnRefresh: true,
        id: `aboutScroll-${index}`
        // markers: true
      });
    };

    const scrollAmount = getScrollAmount() + 160;
    updateSpacer(scrollAmount);

    const tween = createTween(about, scrollAmount);
    createScrollTrigger(wrapper, tween, scrollAmount);

    const containerTrigger = ScrollTrigger.getById(`aboutScroll-${index}`);
    if (!containerTrigger) return;

    gsap.from(wrapper.querySelectorAll(".card-item"), {
      yPercent: 20,
      opacity: 0,
      rotate: 10,
      ease: "power2.out",
      stagger: {
        each: 0.3,
        from: "start"
      },
      scrollTrigger: {
        trigger: wrapper,
        start: "top 60%",
        toggleActions: "play none none none"
        // markers: true
      }
    });

    const images = wrapper.querySelectorAll(".about-cards .card-item img");

    images.forEach((img) => {
      gsap.fromTo(
        img,
        {
          xPercent: -10,
          ease: "none"
        },
        {
          xPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 20%",
            end: `+=${scrollAmount}`,
            scrub: true
            // markers: true
          }
        }
      );
    });
  });
}

function ourPromise() {
  if ($(".our-promise").length < 1) return;

  $(".our-promise .item-line").each(function () {
    const canvas = this;
    const ctx = canvas.getContext("2d");

    const $parent = $(canvas).parent();
    const width = $parent[0].offsetWidth - 10;
    const height = $parent[0].offsetHeight - 10;
    const cornerHeight = height - 80;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(2, 0);
    ctx.lineTo(2, cornerHeight);
    ctx.lineTo(110, height - 2);
    ctx.lineTo(width, height - 2);
    ctx.stroke();
  });
}

function ourExpertise() {
  if ($(".our-expertise").length < 1) return;

  $(".our-expertise .expertise-line").each(function () {
    const canvas = this;
    const ctx = canvas.getContext("2d");

    const $parent = $(canvas).parent();
    const width = $parent[0].offsetWidth - 10;
    const height = $parent[0].offsetHeight - 10;
    const cornerHeight = height - 80;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(95 / 2, 110);
    ctx.lineTo(95 / 2, cornerHeight);
    ctx.lineTo(110, height - 2);
    ctx.lineTo(width, height - 2);
    ctx.stroke();
  });

  let hasCounted = false;
  ScrollTrigger.create({
    trigger: ".expertise-wrapper",
    start: "top center",
    once: true,
    onEnter: () => {
      if (!hasCounted) {
        activeNumberCount();
        hasCounted = true;
      }
    }
  });

  $(".our-expertise .expertise-item .number").each(function () {
    const $stat = $(this);
    const patt = /(\D+)?(\d+(\.\d+)?)(\D+)?/;
    let result = patt.exec($stat.text());

    if (!result) return;

    result.shift(); // Remove the full match
    result = result.filter((res) => res != null); // Remove null values

    $stat.empty();

    result.forEach((res) => {
      if (isNaN(res)) {
        $stat.append(`<span>${res}</span>`);
      } else {
        const digits = res.replace(/[^0-9]/g, "").split("");
        digits.forEach((digit) => {
          const num = parseInt(digit);
          if (!isNaN(num)) {
            $stat.append(`
              <span data-value="${digit}">
                <span> </span>
                ${Array(num + 1)
                  .fill(0)
                  .map((_, j) => `<span>${j}</span>`)
                  .join("")}
              </span>
            `);
          } else {
            $stat.append(`<span>${digit}</span>`);
          }
        });
      }
    });
  });

  function activeNumberCount() {
    $(".our-expertise .number").each(function () {
      const ticks = $(this).find("span[data-value]");
      ticks.each(function () {
        const dist = parseInt($(this).attr("data-value")) + 1;
        $(this).css("transform", `translateY(-${dist * 100}%)`);
      });
    });
  }

  // fade in
  const wrapper = document.querySelector(".expertise-wrapper");
  gsap.from(wrapper.querySelectorAll(".expertise-item"), {
    yPercent: 20,
    opacity: 0,
    ease: "power2.out",
    stagger: {
      each: 0.3,
      from: "start"
    },
    scrollTrigger: {
      trigger: wrapper,
      start: "top 60%",
      toggleActions: "play none none none"
      // markers: true
    }
  });
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);

  sectionAbout();
  ourPromise();
  ourExpertise();
};
preloadImages("img").then(() => {
  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});

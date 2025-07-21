import { preloadImages } from "../../libs/utils.js";

function projectScroll() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const projects = gsap.utils.toArray(".project");

  const introProject = projects[0];
  const titles = gsap.utils.toArray(".project-title h2");
  titles.forEach((title) => {
    const split = new SplitText(title, {
      type: "words, chars",
      charsClass: "char",
      wordsClass: "word"
    });
    split.chars.forEach((char) => {
      char.innerHTML = `<span>${char.textContent}</span>`;
    });
  });

  const projectImgWrapper = introProject.querySelector(".project-img");
  const projectImg = introProject.querySelector(".project-img img");

  gsap.set(projectImgWrapper, {
    scale: 0.5,
    borderRadius: "400px"
  });
  gsap.set(projectImg, {
    scale: 1.5
  });
  function animateContentIn(titleChars, description, button) {
    gsap.to(titleChars, {
      filter: "blur(0px)",
      y: 0,
      skewX: "0deg",
      // stagger: 0.05,
      opacity: 1
    });
    gsap.to(description, {
      y: 0,
      opacity: 1,
      duration: 0.75,
      ease: "power4.out"
    });
    gsap.to(button, {
      y: 0,
      opacity: 1,
      duration: 0.75,
      delay: 0.05,
      ease: "power4.out"
    });
  }
  function animateContentOut(titleChars, description, button) {
    gsap.to(titleChars, {
      filter: "blur(10px)",
      y: 10,
      willChange: "filter, transform",
      opacity: 0,
      skewX: "-3deg"
    });
    gsap.to(description, {
      y: "40px",
      opacity: 0,
      duration: 0.5,
      ease: "power4.out"
    });
    gsap.to(button, {
      y: "40px",
      opacity: 0,
      duration: 0.5,
      ease: "power4.out"
    });
  }

  const titleChars = introProject.querySelectorAll(".char span");
  const description = introProject.querySelector(".project-description");
  const button = introProject.querySelector(".project-button");
  const endPonitValue = (projects.length - 1) * 100 + "vh";
  ScrollTrigger.create({
    trigger: introProject,
    start: "top top",
    end: `+=${endPonitValue}`,
    onUpdate: (self) => {
      const progress = self.progress;
      const imgScale = 0.5 + progress * 0.5;
      const borderRadius = 400 - progress * 400;
      const innerImgScale = 1.5 - progress * 0.5;

      gsap.set(projectImgWrapper, {
        scale: imgScale,
        borderRadius: borderRadius + "px"
      });
      gsap.set(projectImg, {
        scale: innerImgScale
      });
      if (progress >= 1 && !introProject.contentRevealed) {
        introProject.contentRevealed = true;
        animateContentIn(titleChars, description, button);
      }
      if (progress < 1 && introProject.contentRevealed) {
        introProject.contentRevealed = false;
        animateContentOut(titleChars, description, button);
      }
    }
  });

  projects.forEach((project, index) => {
    const isLastProject = index === projects.length - 1;
    ScrollTrigger.create({
      trigger: project,
      start: "top top",
      end: isLastProject ? "+=100vh" : "top top",
      endTrigger: isLastProject ? null : projects[projects.length - 1],
      pin: true,
      pinSpacing: isLastProject
    });
  });
  projects.forEach((project, index) => {
    if (index < projects.length - 1) {
      const projectWrapper = project.querySelector(".project-wrapper");
      ScrollTrigger.create({
        trigger: projects[index + 1],
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(projectWrapper, {
            scale: 1 - progress * 0.15,
            opacity: 1 - progress
          });
        }
      });
    }
  });
  projects.forEach((project, index) => {
    if (index > 0) {
      const projectImg = project.querySelector(".project-img img");
      const imgContainer = project.querySelector(".project-img");
      ScrollTrigger.create({
        trigger: project,
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(projectImg, {
            scale: 2 - progress
          });
          gsap.set(imgContainer, {
            borderRadius: 50 - progress * 50 + "px"
          });
        }
      });
    }
  });
  projects.forEach((project, index) => {
    if (index === 0) return;
    const projectDescription = project.querySelector(".project-description");
    const projectTitleChars = project.querySelectorAll(".char span");
    const projectButton = project.querySelector(".project-button");
    ScrollTrigger.create({
      trigger: project,
      start: "top top",
      // markers: true,
      onEnter: () =>
        animateContentIn(projectTitleChars, projectDescription, projectButton),
      onLeaveBack: () =>
        animateContentOut(projectTitleChars, projectDescription, projectButton)
    });
  });
  ScrollTrigger.refresh();
}
function marquee() {
  document.querySelectorAll(".marquee-container").forEach((container) => {
    const content = container.querySelector(".marquee-content");
    const items = [...container.querySelectorAll(".marquee-item")];
    const speed = parseFloat(container.getAttribute("data-speed")) || 50;

    content.innerHTML = "";
    items.forEach((item) => content.appendChild(item.cloneNode(true)));

    const clonedItems = [...content.children];
    let totalWidth = 0;

    clonedItems.forEach((item) => (totalWidth += item.offsetWidth));

    const containerWidth = container.offsetWidth;
    const copiesNeeded = Math.ceil(containerWidth / totalWidth) + 2;

    for (let i = 0; i < copiesNeeded; i++) {
      clonedItems.forEach((item) => {
        content.appendChild(item.cloneNode(true));
      });
    }

    let fullWidth = 0;
    [...content.children].forEach((item) => (fullWidth += item.offsetWidth));

    gsap.set(content, { x: 0, willChange: "transform", force3D: true });

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(content, {
      x: -fullWidth,
      duration: fullWidth / speed,
      ease: "none",
      modifiers: {
        x: (x) => `${parseFloat(x) % fullWidth}px`
      }
    });

    // Hover pause
    container.addEventListener("mouseenter", () => tl.pause());
    container.addEventListener("mouseleave", () => tl.resume());
  });
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  projectScroll();
  marquee();
};
preloadImages("img").then(() => {
  init();
});

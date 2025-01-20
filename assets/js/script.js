"use strict";
$ = jQuery;

$(document).ready(function () {
  animateCard3D();
});

function animateCard3D() {
  var limits = 5.0;
  $(".about-us__item").mousemove(function (e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.
    var offsetX = x / rect.width;
    var offsetY = y / rect.height;

    var rotateY = offsetX * (limits * 2) - limits;
    var rotateX = offsetY * (limits * 2) - limits;

    var shadowOffsetX = offsetX * 32 - 16;
    var shadowOffsetY = offsetY * 32 - 16;

    $(this).css({
      "box-shadow":
        (1 / 6) * -shadowOffsetX +
        "px " +
        (1 / 6) * -shadowOffsetY +
        "px 3px rgba(0, 0, 0, 0.051), " +
        (2 / 6) * -shadowOffsetX +
        "px " +
        (2 / 6) * -shadowOffsetY +
        "px 7.2px rgba(0, 0, 0, 0.073), " +
        (3 / 6) * -shadowOffsetX +
        "px " +
        (3 / 6) * -shadowOffsetY +
        "px 13.6px rgba(0, 0, 0, 0.09), " +
        (4 / 6) * -shadowOffsetX +
        "px " +
        (4 / 6) * -shadowOffsetY +
        "px 24.3px rgba(0, 0, 0, 0.107), " +
        (5 / 6) * -shadowOffsetX +
        "px " +
        (5 / 6) * -shadowOffsetY +
        "px 45.5px rgba(0, 0, 0, 0.129), " +
        -shadowOffsetX +
        "px " +
        -shadowOffsetY +
        "px 109px rgba(0, 0, 0, 0.18)",
      transform:
        "perspective(1000px) rotateX(" +
        -rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg)"
    });

    var glarePos = rotateX + rotateY + 90;
    $(this)
      .children()
      .children()
      .css("left", glarePos + "%");
  });

  $(".about-us__item").mouseleave(function (e) {
    $(".about-us__item").css({"box-shadow": "0px 0px 3px rgba(0, 0, 0, 0.051), 0px 0px 7.2px rgba(0, 0, 0, 0.073), 0px 0px 13.6px rgba(0, 0, 0, 0.09), 0px 0px 24.3px rgba(0, 0, 0, 0.107), 0px 0px 45.5px rgba(0, 0, 0, 0.129), 0px 0px 109px rgba(0, 0, 0, 0.18)", "transform": "scale(1.0)"});
    $(".glare").css("left", "100%");
  });
}

// shooting star
const shootingStar = document.querySelectorAll(".shooting-star");
shootingStar.forEach((element, index) => {
  const count = element.dataset.count;
  console.log(count);

  for (let i = 0; i < count; i++) {
    const leftValue = Math.random() * 60 + 10; // Zufallswert zwischen 10% und 70%
    const bottomValue = Math.random() * 30 + 80; // Zufallswert zwischen 80% und 110%
    const animationDelayValue = Math.random() * 15; // Zufallswert zwischen 0s und 45s

    // Neues Div-Element erstellen
    const speedLine = document.createElement("div");
    speedLine.className = "speed-line";
    speedLine.style.left = `${leftValue}%`;
    speedLine.style.bottom = `${bottomValue}%`;
    speedLine.style.animationDelay = `${animationDelayValue}s`;

    // Neues Element zum aktuellen Element hinzufügen
    element.appendChild(speedLine);
  }
});

document
  .querySelector(".banner-hero__content h2")
  .addEventListener("mousemove", (event) => {
    const textElement = event.currentTarget;
    const rect = textElement.getBoundingClientRect();

    // Tính toán vị trí chuột theo tỷ lệ phần trăm
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

    // Cập nhật background-position
    textElement.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  });

// Reset background-position khi chuột rời
document
  .querySelector(".banner-hero__content h2")
  .addEventListener("mouseleave", (event) => {
    const textElement = event.currentTarget;
    textElement.style.backgroundPosition = "center";
  });

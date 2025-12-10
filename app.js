const profileSlider = document.getElementById("aboutMe");
const diagram = profileSlider.querySelector(".diagram");
const diagramFill = diagram.querySelectorAll(".fill");
const diagramCircle = diagram.querySelectorAll(".circle");

function sliderAnimation(index, width, left) {
  diagramFill[index].style.width = `${width}%`;
  diagramCircle[index].style.left = `${left}%`;
}
// animating diagram sliders
const options = {
  root: null,
  threshold: 0.3,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      sliderAnimation(0, 72, 70);
      sliderAnimation(1, 50, 48);
      sliderAnimation(2, 60, 58);
      sliderAnimation(3, 84, 82);
      observer.unobserve(entry.target);
    }
    return;
  });
}, options);
observer.observe(profileSlider);

// carousel slider
const slide = document.querySelectorAll(".testimonials-slide");
const dot = document.querySelectorAll(".dot");
let activeIndex = 0;
let intervalId = null;

function checkForActive() {
  slide.forEach((el) => {
    if (!el.classList.contains("active")) {
      slide[0].classList.toggle("active");
    }
  });
}
checkForActive();
function updateSlider() {
  slide.forEach((el, index) => {
    el.classList.toggle("active", activeIndex === index);
  });
  dot.forEach((el, index) => {
    el.classList.toggle("active", activeIndex === index);
  });
}
function autoSlider() {
  intervalId = setInterval(() => {
    checkForActive();
    updateSlider();
    activeIndex++;
    if (activeIndex > slide.length - 1) activeIndex = 0;
    if (activeIndex > dot.length - 1) activeIndex = 0;
  }, 1000);
}
autoSlider();
dot.forEach((el, index) => {
  el.addEventListener("click", () => {
    clearInterval(intervalId);
    activeIndex = index;
    updateSlider();
    autoSlider();
  });
});
slide.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });
  el.addEventListener("mouseleave", () => {
    autoSlider();
  });
});

const profileSlider = document.getElementById("aboutMe");
const diagram = profileSlider.querySelector(".diagram");
const diagramFill = diagram.querySelectorAll(".fill");
const diagramCircle = diagram.querySelectorAll(".circle");

function sliderAnimation(index, width, left) {
  diagramFill[index].style.width = `${width}%`;
  diagramCircle[index].style.left = `${left}%`;
}
// burger icon logic

const headerList = document.querySelector(".header-nav ul");
const burgerIcon = document.querySelector(".burger-btn");
burgerIcon.addEventListener("click", (el) => {
  headerList.classList.toggle("active");
  el.target.classList.toggle("rotate");
});

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

// my project button logic
const btnContainer = document.querySelectorAll(".btn-container button");

btnContainer.forEach((el) => {
  el.addEventListener("click", () => {
    btnContainer.forEach((btn) => btn.removeAttribute("active"));
    el.setAttribute("active", "");
    console.log(el.value);
  });
});

// carousel slider
const slide = document.querySelectorAll(".testimonials-slide");
const dot = document.querySelectorAll(".dot");
let activeIndex = 0;
let intervalId = null;

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
    updateSlider();
    activeIndex++;
    if (activeIndex > slide.length - 1) activeIndex = 0;
    if (activeIndex > dot.length - 1) activeIndex = 0;
  }, 3000);
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

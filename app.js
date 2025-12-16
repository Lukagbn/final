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
      sliderAnimation(0, 95, 93);
      sliderAnimation(1, 96, 94);
      sliderAnimation(2, 96, 94);
      sliderAnimation(3, 98, 96);
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
// my project logic
const projectsContainer = document.querySelector(
  ".myProjcets-projects-wrapper"
);
const btnContainer = document.querySelectorAll(".btn-container button");
const startingValue = "Web Design";

btnContainer.forEach((el) => {
  if (el.hasAttribute("active")) {
    fetch("./myProjects.json")
      .then((res) => res.json())
      .then((result) => {
        projectsContainer.innerHTML = result
          .map(
            (element) =>
              `
              <div class="myProjcets-card invisible"data-group="${element.projectGroup}">
                <a href="${element.projectUrl}" target="_blank">
                <img src="${element.projectImg}" alt="project image" />
                </a>
                <p>${element.projectName}</p>
                <h3>${element.projectTitle}</h3>
              </div>
            `
          )
          .join("");
        const projectName =
          projectsContainer.querySelectorAll(".myProjcets-card");
        projectName.forEach((card) => {
          if (card.dataset.group === startingValue) {
            card.classList.toggle("invisible");
          }
        });
      });
  }
  el.addEventListener("click", () => {
    const btnValue = el.value;
    console.log(btnValue);
    fetch("./myProjects.json")
      .then((res) => res.json())
      .then((result) => {
        projectsContainer.innerHTML = result
          .map(
            (element) =>
              `
              <div class="myProjcets-card invisible"data-group="${element.projectGroup}">
                <a href="${element.projectUrl}" target="_blank">
                  <img src="${element.projectImg}" alt="project image" />
                </a>
                <p>${element.projectName}</p>
                <h3>${element.projectTitle}</h3>
              </div>
            `
          )
          .join("");
        const projectName =
          projectsContainer.querySelectorAll(".myProjcets-card");
        projectName.forEach((card) => {
          if (card.dataset.group === btnValue) {
            card.classList.toggle("invisible");
          }
          if (btnValue === "All") {
            card.classList.toggle("invisible");
          }
        });
      });
    btnContainer.forEach((btn) => btn.removeAttribute("active"));
    el.setAttribute("active", "");
  });
});

const contactForm = document.querySelector("form");
const dialog = document.getElementById("dialog");
const body = document.querySelector("body");
const nameInput = contactForm.querySelector(".name");
const emailInput = contactForm.querySelector(".email");
const webInput = contactForm.querySelector(".yourWeb");
const messageInput = contactForm.querySelector(".yourMessage");
const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  fetch("https://borjomi.loremipsum.ge/api/send-message", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      web: webInput.value.trim(),
      message: messageInput.value.trim(),
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
  dialog.showModal();
  body.classList.add("overFlow-hidden");
  if (nameInput.value.trim().length < 3) {
    console.log("too short name");
  }
  if (!emailPattern.test(emailInput.value.trim())) {
    console.log("try again");
  }
});
const closeContact = document.querySelector(".cross");
closeContact.addEventListener("click", (e) => {
  dialog.close();
  body.classList.remove("overFlow-hidden");
  contactForm.reset();
});
document.addEventListener("click", (e) => {
  if (e.target === dialog) {
    dialog.close();
    body.classList.remove("overFlow-hidden");
    contactForm.reset();
  }
});
nameInput.addEventListener("input", (e) => {
  if (e.target.value.length < 8) {
    console.log("try again");
  }
});
emailInput.addEventListener("input", (e) => {
  if (gmailPattern.test(e.target.value)) {
    console.log("good");
  } else {
    console.log("invalid");
  }
});
webInput.addEventListener("input", (e) => {
  console.log(e.target.value);
});
messageInput.addEventListener("input", (e) => {
  if (e.target.value.length < 50) {
    console.log("message words are too short!");
  } else {
    console.log("looks good!");
  }
});

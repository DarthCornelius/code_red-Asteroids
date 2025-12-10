var taskComplete = false;
var destroyed = 0;
var asteroidsList = [
  "images/a1.png",
  "images/a1.png",
  "images/a1.png",
  "images/a1.png",
  "images/a2.png",
  "images/a2.png",
  "images/a2.png",
  "images/a2.png",
  "images/a3.png",
  "images/a3.png",
  "images/a3.png",
  "images/a4.png",
  "images/a4.png",
  "images/a4.png",
  "images/a4.png",
  "images/a5.png",
  "images/a5.png",
  "images/a5.png",
  "images/a5.png",
  "images/a5.png",
];
const clos3r = document.getElementById("clos3r");
const open3r = document.getElementById("open3r");
const ambient = document.getElementById("ambient");
const compl3te = document.getElementById("compl3te");
const typer = document.getElementById("typer");
const feet = document.getElementById("feet");

const modalBody = document.getElementById("modalBody");
const startBtn = document.getElementById("startBtn");

function showModal() {
  if (taskComplete == false) {
    open3r.play();
    // explicit check
    document.getElementById("myModal").style.display = "flex";
    document.getElementById("taskStart").classList.remove("yeller");
    startBtn.style.display = "flex";
    destroyed = 0;
    document.getElementById("scoreText").textContent =
      "Asteroids Destroyed: " + destroyed + "/20";
  }
}

function startTask() {
  startBtn.style.display = "none";
  const modalWidth = modalBody.clientWidth;

  asteroidsList.forEach((src, index) => {
    setTimeout(() => {
      const img = document.createElement("img");
      img.src = src;
      img.style.width = "80px";
      img.style.height = "80px";
      img.style.position = "absolute";
      img.classList.add("asteroid");
      img.isDestroyed = false; // flag for click

      const maxY = modalBody.clientHeight - 80;
      img.style.left = modalWidth + 65 + "px";
      img.style.top = Math.random() * maxY + "px";

      // Click listener directly on each asteroid
      img.addEventListener("mousedown", () => {
        if (!img.isDestroyed) {
          img.isDestroyed = true;
          destroyed++;
          document.getElementById("scoreText").textContent =
            "Asteroids Destroyed: " + destroyed + "/20";

          // Get asteroid position relative to modal
          const imgRect = img.getBoundingClientRect();
          const modalRect = modalBody.getBoundingClientRect();

          const explosion = document.createElement("img");
          explosion.src = "images/xplode.png";
          explosion.style.position = "absolute";

          // Correct relative position inside modal
          explosion.style.left = `${
            imgRect.left - modalRect.left + modalBody.scrollLeft + 95
          }px`;
          explosion.style.top = `${
            imgRect.top - modalRect.top + modalBody.scrollTop + 170
          }px`;

          explosion.style.width = `${imgRect.width}px`;
          explosion.style.height = `${imgRect.height}px`;
          explosion.style.pointerEvents = "none";
          explosion.style.zIndex = 50;

          // append before removing asteroid
          modalBody.appendChild(explosion);
          img.remove();

          // remove explosion after 500ms
          setTimeout(() => explosion.remove(), 500);

          const splode = document.getElementById("splode");
          splode.currentTime = 0;
          splode.play();

          if (destroyed == 20) imCompletingIt();
        }
      });
      modalBody.appendChild(img);
      moveAsteroid(img);
    }, index * 500);
  });
}

function moveAsteroid(img) {
  let posX = parseFloat(img.style.left);
  const speed = Math.random() * 2 + 1;
  let posY = parseFloat(img.style.top);
  let speedY = Math.random() * 3 - 1.5;
  const move = () => {
    // stop movement if asteroid was clicked
    if (img.isDestroyed == true) return; // explicit check
    posY -= speedY;

    posX -= speed;
    if (posY < 30) {
      posY = 30;
      speedY = -speedY;
    }

    // Bounce off bottom
    if (posY - 30 > modalBody.clientHeight) {
      posY = modalBody.clientHeight + 30;
      speedY = -speedY;
    }

    img.style.left = posX + "px";
    img.style.top = posY + "px";

    // Remove asteroid if it reaches left side
    if (posX - 10 < 0) {
      img.remove();
      imposterIsSus();
    } else {
      requestAnimationFrame(move);
    }
  };

  requestAnimationFrame(move);
}

function hideModal2() {
  taskComplete = true; // explicit assignment
  document.getElementById("myModal").style.display = "none";
  const killThemAll = modalBody.querySelectorAll(".asteroid");
  killThemAll.forEach((img) => img.remove());
  document.getElementById("taskStart").classList.remove("hover");
  compl3te.play();
}

function imposterIsSus() {
  taskComplete = true; // explicit assignment
  document.getElementById("myModal").style.display = "none";
  const killThemAll = modalBody.querySelectorAll(".asteroid");
  killThemAll.forEach((img) => img.remove());
  document.getElementById("taskStart").classList.remove("hover");
  feet.play();

  setTimeout(() => {
    document.getElementById("myOtherModal").style.display = "flex";
  }, 500);

  setTimeout(() => {
    window.location.href = "https://mrlcxl.csb.app/";
  }, 2000);
}
function imCompletingIt() {
  taskComplete = true; // explicit assignment
  document.getElementById("myModal").style.display = "none";

  document.getElementById("taskStart").classList.remove("hover");
  document.getElementById("oxy").classList.add("hover");

  setTimeout(() => {
    document.getElementById("myOtherOtherModal").style.display = "flex";
    compl3te.play();
  }, 500);

  setTimeout(() => {
    document.getElementById("myOtherOtherModal").style.display = "none";
  }, 2000);
  setTimeout(() => {
    const alarm = document.getElementById("alarm");
    alarm.currentTime = 0; // restart sound each click
    alarm.play();
    alarm.volume = 1;
    document.getElementById("myOtherOtherOtherOtherModal").style.display =
      "flex";

    document.getElementById("myOtherOtherOtherModal").style.display = "flex";
    setInterval(() => {
      document.getElementById("myOtherOtherOtherModal").classList.toggle("red");
    }, 500);
  }, 2500);
}

function goToOxygen() {
  window.location.href = "https://8v96fn.csb.app/";
}

// Show the map modal
function showMap() {
  document.getElementById("myMap").style.display = "flex";
  open3r.play();
}

// Hide the map modal
function hideMap() {
  clos3r.play();
  document.getElementById("myMap").style.display = "none";
}

// Toggle the map modal with the same image
function toggleMap() {
  const modal = document.getElementById("myMap"); // ✅ should be the modal
  if (modal.style.display === "flex" || modal.style.display === "") {
    modal.style.display = "none"; // hide if visible
    clos3r.play();
  } else {
    modal.style.display = "flex"; // show if hidden
    open3r.play();
  }
}
modalBody.addEventListener("mousedown", () => {
  const blast = document.getElementById("blast");
  blast.currentTime = 0; // restart sound each click
  blast.play();
  blast.volume = 0.3;
});

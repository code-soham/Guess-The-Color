//service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service_worker.js")
    .then((registration) => {
      console.log("Service Worker Registered");
    })
    .catch((err) => {
      console.log("Service Worker Failed to Register", err);
    });
}

var r = [],
  g = [],
  b = [];
var ans_index; // answer index
var ans; //stores answer string
var diff = 3; //default difficulty
/*
[r,r,r,r,r,r]
[g,g,g,g,g,g]
[b,b,b,b,b,b]
*/
function setColor(x = 3) {
  const col_div = document.querySelector(".col_gen");
  generate(x);
  col_div.innerHTML = `rgb(${r[ans_index]},${g[ans_index]},${b[ans_index]})`;
  setBoxes(x);
}

function generate(x = 3) {
  for (let i = 0; i < 6; i++) {
    r[i] = Math.floor(Math.random() * 255);
    g[i] = Math.floor(Math.random() * 255);
    b[i] = Math.floor(Math.random() * 255);
  }
  ans_index = Math.floor(Math.random() * x);
  ans = "rgb(" + r[ans_index] + ", " + g[ans_index] + ", " + b[ans_index] + ")";
}
function setBoxes(x = 3) {
  const main = document.querySelector("#main");
  main.innerHTML = "";
  for (let i = 0; i < x; i++) {
    var box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute("onclick", "verify(this.style.backgroundColor)");
    box.style.backgroundColor = `rgb(${r[i]},${g[i]},${b[i]})`;
    main.appendChild(box);
  }
}
function verify(color) {
  if (color == ans) {
    alert("Correct");
  } else {
    alert("Wrong");
  }
}
function setState(x = diff) {
  diff = x;
  setColor(x);
}
setColor();

var r = [],
  g = [],
  b = [];
var ans_index; // answer index
var ans; //stores answer string
var diff = 3; //default difficulty
const panel = document.querySelector(".verdict");
const head = document.querySelector("header");
const col_div = document.querySelector(".col_gen");
const main = document.querySelector("#main");
const boxes = document.getElementById("main").children;

/*
[r,r,r,r,r,r]
[g,g,g,g,g,g]
[b,b,b,b,b,b]
*/
function setColor(x = 3) {
  head.style.backgroundColor = "rgba(255, 255, 255, 0.072)";
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
  main.innerHTML = "";
  for (let i = 0; i < x; i++) {
    var box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute("onclick", "verify(this)");
    box.style.backgroundColor = `rgb(${r[i]},${g[i]},${b[i]})`;
    main.appendChild(box);
  }
}
function win(panel) {
  head.style.backgroundColor = ans;
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor = ans;
    boxes[i].classList.remove("wrong");
    boxes[i].classList.add("box");
  }
  panel.innerText = "Winner!";
  panel.style.textShadow = "2px 2px red";
}
function wrong(panel) {
  panel.innerText = "Try Again!";
}
function verify(obj) {
  if (obj.style.backgroundColor == ans) {
    win(panel);
  } else {
    obj.classList.remove("box");
    obj.style.backgroundColor = "rgba(0,0,0,0)";
    obj.classList.add("wrong");
    // alert(obj.classList);
    wrong(panel);
  }
}
function setState(x = diff) {
  diff = x;
  panel.innerText = "GUESS-IT";
  setColor(x);
}
setColor();

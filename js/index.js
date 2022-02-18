if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
          .then((reg) => console.log("Success: ", reg.scope))
          .catch((err) => console.log("Failure: ", err));
  })
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
  const head= document.querySelector("header");
  head.style.backgroundColor = 'rgba(255, 255, 255, 0.072)';
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
    box.setAttribute("onclick", "verify(this)");
    box.style.backgroundColor = `rgb(${r[i]},${g[i]},${b[i]})`;
    main.appendChild(box);
  }
}
function win(){
  const head= document.querySelector("header");
  head.style.backgroundColor = ans;
  const boxes= document.getElementById("main").children;
  for(let i=0;i<boxes.length;i++){
    boxes[i].style.backgroundColor = ans;
    boxes[i].classList.remove("wrong");
    boxes[i].classList.add("box");
  }
}
function verify(obj) {
  if (obj.style.backgroundColor == ans) {
    win();
  } else {
    obj.classList.remove("box");
    obj.style.backgroundColor = "rgba(0,0,0,0)";
    obj.classList.add("wrong");
    // alert(obj.classList);
  }
}
function setState(x = diff) {
  diff = x;
  setColor(x);
}
setColor();

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

let plus = Array.from(document.getElementsByClassName("fa-solid fa-circle-plus"));
let minus = Array.from(document.getElementsByClassName("fa-solid fa-circle-minus"));
let qte = Array.from(document.getElementsByClassName("price"));
let price = Array.from(document.getElementsByClassName("totalmoney"));
let aprice = Array.from(document.getElementsByClassName("text1"));
let heart = Array.from(document.getElementsByClassName("fa-solid fa-heart"));
let trash = Array.from(document.getElementsByClassName("fa-solid fa-trash"));
// var my_div = document.querySelectorAll(".card mb-3");
//plus
for (let i = 0; i < plus.length; i++) {
  plus[i].addEventListener("click", function () {
    qte[i].innerHTML++;
    totale();
  });
}

//minus
for (let i = 0; i < plus.length; i++) {
  minus[i].addEventListener("click", function () {
    if (qte[i].innerHTML > 1) {
      qte[i].innerHTML--;
      totale();
    }
  });
}
//total*

for (let i = 0; i < heart.length; i++) {
  heart[i].addEventListener("click", function () {
    if (heart[i].classList.contains("fas")) {
      heart[i].classList.remove("fas");
      heart[i].classList.add("far");
    } else {
      heart[i].classList.remove("far");
      heart[i].classList.add("fas");
    }
  });
}
// remouve


for (let i = 0; i < trash.length; i++){
  console.log(i);
  trash[i].addEventListener("click", function (e) {
    e.preventDefault();
    if (qte[i].innerHTML > 0) {
      qte[i].innerHTML = 0;
      totale();
    }
  });
}
  let number = document.getElementsByClassName("price")
  const trashcan = document.querySelectorAll(".fa-solid fa-trash")
  console.log(trashcan)
  let prices = document.getElementsByClassName("text1")
  let totalprice = document.getElementsByClassName("totalmoney")
 trashcan.forEach((f)=>{
  f.addEventListener("click", function(e){
    if (parseInt(number.innerHTML) > 0){
      number.innerHTML = 0
      totalprice.innerHTML = parseInt(totalprice.innerHTML) - parseInt(prices.innerHTML)
      totale();
      
    }
  })
 })


function totale() {
  let p = Array.from(document.getElementsByClassName("text1"));
  let q = Array.from(document.getElementsByClassName("price"));

  let somme = 0;
  for (let i = 0; i < p.length; i++) {
    somme = somme + parseFloat(q[i].innerHTML) * parseFloat(p[i].innerHTML);
  }
  document.querySelector(".totalmoney").innerHTML = somme;
}

let hearts = document.querySelectorAll(".fa-heart");
console.log(hearts)
function toggleHeartColor() {

  hearts.forEach(heart => {
    heart.addEventListener("click", function(e) {
      e.preventDefault();
      heart.classList.toggle("red")
    });
  });
}
toggleHeartColor();

// Call the function to enable the behavior

const btn = document.querySelector(".promobtn")
console.log(btn)
btn.addEventListener("click", function(e) {
  
  alert("yime for the discount game !")
  
 })


  
  








//-----------------
$('.toggle i').click(function(){
    $('ul').toggleClass('show');
  })




//scroolll too toopp
// Add an event listener to the scroll-to-top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Show or hide the scroll-to-top button based on scroll position
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Get the input element and card elements
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");

// Add an event listener to the input for the live search
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const cardName = card.querySelector(".card-name").textContent.toLowerCase();
    
    if (cardName.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

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


//-----------------
$('.toggle i').click(function(){
    $('ul').toggleClass('show');
  })
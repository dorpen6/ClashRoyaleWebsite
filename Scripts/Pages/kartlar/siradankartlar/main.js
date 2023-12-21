const searchInput = document.getElementById('searchInput');
  const cardContainer = document.getElementById('cardContainer');
  const cards = cardContainer.getElementsByClassName('card');

  // Add an event listener to the search input
  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();

    // Loop through cards and hide those that don't match the search term
    for (const card of cards) {
      const name = card.querySelector('.name').textContent.toLowerCase();
      if (name.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    }
  });
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
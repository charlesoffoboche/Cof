
  function openModal(imgElement) {
    const src = imgElement.querySelector('img').src;
    document.getElementById('modalImage').src = src;

    // Social share links
    const encodedURL = encodeURIComponent(src);
    document.getElementById('shareFacebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;
    document.getElementById('shareTwitter').href = `https://twitter.com/intent/tweet?url=${encodedURL}`;
    document.getElementById('shareWhatsApp').href = `https://wa.me/?text=${encodedURL}`;

    const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
    modal.show();
  }

  // about.js
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card, .value-card");

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 12px 25px rgba(0,0,0,0.1)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.05)";
    });
  });
});


// Gallery JS
    function openModal(src) {
  document.getElementById('imgModal').style.display = "block";
  document.getElementById('modalImg').src = src;
  document.getElementById('caption').innerHTML = "";
}

function closeModal() {
  document.getElementById('imgModal').style.display = "none";
}

function shareImage(imgSrc) {
  const pageUrl = window.location.href;
  const fullUrl = `${pageUrl}#${imgSrc}`;

  // Simulate share (you can later connect actual APIs)
  alert(`Sharing: ${fullUrl}`);
}


// Slider JS
const track = document.getElementById('sliderTrack');
const dotsContainer = document.getElementById('sliderDots');
const totalSlides = document.querySelectorAll('.slide').length;
let currentSlide = 0;

// Create navigation dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}
const dots = dotsContainer.querySelectorAll('span');

function updateDots(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
}

function goToSlide(index) {
  currentSlide = index;
  const offset = -index * 100;
  track.style.transform = `translateX(${offset}%)`;
  updateDots(index);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}

updateDots(0);
setInterval(nextSlide, 7000); // Auto-scroll every 7 seconds





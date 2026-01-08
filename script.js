let currentLang = navigator.language.startsWith('ar') ? 'ar' : 'en';

function applyLang() {
  document.querySelectorAll('[data-ar]').forEach(el => {
    el.innerText = el.dataset[currentLang];
  });
}

function setLang(lang) {
  currentLang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  applyLang();
}

/* LIGHTBOX */
let images = [];
let index = 0;

function openLightbox(arr) {
  images = arr;
  index = 0;
  showImage();
}

function showImage() {
  const lb = document.getElementById('lightbox');
  lb.style.display = 'flex';
  lb.querySelector('img').src = images[index];
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function nextImage() {
  index = (index + 1) % images.length;
  showImage();
}

function prevImage() {
  index = (index - 1 + images.length) % images.length;
  showImage();
}

/* Swipe */
let startX = 0;
const lb = document.getElementById('lightbox');

lb.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

lb.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextImage();
  if (endX - startX > 50) prevImage();
});

applyLang();

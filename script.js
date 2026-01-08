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
  renderDots();
  showImage();
}

function showImage() {
  const lb = document.getElementById('lightbox');
  lb.style.display = 'flex';
  lb.querySelector('img').src = images[index];
  updateDots();
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

/* DOTS */
function renderDots() {
  const dots = document.querySelector('.dots');
  dots.innerHTML = '';
  images.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    dots.appendChild(d);
  });
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

/* SWIPE */
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
/* ===== LOCK SCROLL ===== */
function openLightbox(arr) {
  images = arr;
  index = 0;
  document.body.classList.add('lock-scroll');
  renderDots();
  showImage();
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  document.body.classList.remove('lock-scroll');
}

/* ===== MOUSE SWIPE (DESKTOP) ===== */
let mouseDown = false;
let mouseStartX = 0;

lb.addEventListener('mousedown', e => {
  mouseDown = true;
  mouseStartX = e.clientX;
});

lb.addEventListener('mouseup', e => {
  if (!mouseDown) return;
  let mouseEndX = e.clientX;
  mouseDown = false;

  if (mouseStartX - mouseEndX > 50) nextImage();
  if (mouseEndX - mouseStartX > 50) prevImage();
});

lb.addEventListener('mouseleave', () => {
  mouseDown = false;
});

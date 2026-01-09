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

function renderDots() {
  const dots = document.querySelector('.dots');
  dots.innerHTML = '';
  images.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot';
    if (i === 0) d.classList.add('active');
    dots.appendChild(d);
  });
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

function nextImage() {
  index = (index + 1) % images.length;
  showImage();
}

function prevImage() {
  index = (index - 1 + images.length) % images.length;
  showImage();
}

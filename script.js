document.addEventListener('DOMContentLoaded', () => {

  let images = [];
  let index = 0;

  const lightbox = document.getElementById('lightbox');
  const frame = document.querySelector('.lightbox-frame');
  const dotsContainer = document.querySelector('.dots');

  function openLightbox(arr) {
    images = arr;
    index = 0;
    renderDots();
    showImage();
    lightbox.style.display = 'flex';
  }

  function showImage() {
    frame.querySelector('img').src = images[index];
    updateDots();
  }

  function renderDots() {
    dotsContainer.innerHTML = '';
    images.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'dot';
      if (i === 0) d.classList.add('active');
      dotsContainer.appendChild(d);
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

  function closeLightbox() {
    lightbox.style.display = 'none';
  }

  // زر الإغلاق
  document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);

  // النقر على الخلفية يغلق
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // جعل أزرار prev/next تعمل
  document.querySelector('.prev').addEventListener('click', (e) => {
    e.stopPropagation();
    prevImage();
  });
  document.querySelector('.next').addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
  });

  // دعم السوايب (للايفون)
  let startX = 0;
  frame.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  frame.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if(startX - endX > 50) nextImage();
    if(endX - startX > 50) prevImage();
  });

  // جعل الدوال متاحة عالمياً حتى HTML يعمل onclick
  window.openLightbox = openLightbox;
  window.nextImage = nextImage;
  window.prevImage = prevImage;
  window.closeLightbox = closeLightbox;

});

// Page loader
const overlay = document.querySelector('.overlay');

window.addEventListener('load', () => {
  overlay.classList += ' hidden';
});

// Lazy load images
const images = document.querySelectorAll('[data-src]');

function preloadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) {
    return;
  }
  img.src = src;
}

const imgOptions = {
  threshold: 0,
  rootMargin: '0px 0px 300px 0px'
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      entry.target.classList.remove('load-image');
      return;
    } else {
      preloadImage(entry.target);
      entry.target.classList.add('load-image');
      imgObserver.unobserve(entry.target);
    }
  });
}, imgOptions);

images.forEach(image => {
  imgObserver.observe(image);
});

// Put color when album is on the viewport
let albums = document.querySelectorAll('.albums__item');

const options = { threshold: 0.9 };

const albumObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // do stuff
    entry.target.classList.toggle('albums__js');
  });
}, options);

albums.forEach(album => {
  albumObserver.observe(album);
});

// to top appear
const toTop = document.querySelector('.to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add('active');
  } else {
    toTop.classList.remove('active');
  }
});

// scroll to top
$(document).ready(function() {
  $('#to-top').click(function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 700);
  });
});
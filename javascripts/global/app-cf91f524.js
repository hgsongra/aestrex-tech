import objectfit from 'object-fit-images';
import lazysizes from 'lazysizes';

// open menu on nav click
$(document).on('click', '.header__nav-toggle', function() {
  $('.header__nav').toggleClass('header__nav--active');
});

$(document).on('ready', function() {
  objectFitImages();
});

//
// If desktop, lazyload the hero video
//
function lazyvideo() {
  const $heroVideo = document.querySelector('.feature__video');

  if ($heroVideo) {
    const $heroVideoSrc = document.querySelector('.feature__video source');
    const heroVideoSrcUrl = $heroVideoSrc.dataset.src;

    if ($heroVideo.offsetWidth > 0) {
      $heroVideoSrc.setAttribute('src', heroVideoSrcUrl);
      $heroVideo.load();
      $heroVideo.play();
    }
  }
}

//
// init
//
document.addEventListener("DOMContentLoaded", function(event) {
  lazyvideo();
});

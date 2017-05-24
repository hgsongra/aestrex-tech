import debounce from 'debounce';

let controller; // declare outside of init so we can reset on resize

function initScrollMagic() {
  // init controller
  controller = new ScrollMagic.Controller({
  //  addIndicators: true // for debug
  });

  const windowHeight = $(window).height();
  const headerHeight = $('.header').height();

  $('.feature:not(.hero) .feature__copy').each(function (index, element) {
    // cached variables
    const sectionCopy = element;
    const section = $(sectionCopy).closest('.feature')[0]; // select the DOM node not the object
    const sectionHeight = $(section).height();
    const sectionCopyHeightOffset = $(sectionCopy).height() + 100;

    // animation tweens
    const tweenBG = TweenMax.fromTo($(sectionCopy).parent().find('.feature__overlay'), 1, { css: {opacity: "0"} }, {css: {opacity: ".65"} });
    const tweenText = TweenMax.fromTo(sectionCopy, .5, { css: {opacity: "0"} }, {css: {opacity: "1"}} );

    // scrollmagic scenes
    const sceneBG = new ScrollMagic.Scene({
      triggerHook: 'onEnter',
      duration: sectionCopyHeightOffset,
      triggerElement: sectionCopy,
      offset: windowHeight,
    })
    .setTween(tweenBG)
    .addTo(controller);

    const stickyBG = new ScrollMagic.Scene({
      triggerHook: 'onLeave',
      duration: "100%",
      triggerElement: section,
      offset: -(headerHeight)
    })
    .setClassToggle(section, 'scrolling')
    .addTo(controller);

    const unStickyBG = new ScrollMagic.Scene({
      triggerHook: 'onEnter',
      duration: '100%',
      triggerElement: section,
      offset: sectionHeight,
    })
    .setClassToggle(section, 'scrolling--complete')
    .addTo(controller);
  });
}

// init scroll magic
initScrollMagic();

// on window resize, let's re-init scrollmagic scenes but debounce responsibly
window.onresize = debounce(function() {
  controller.destroy(true);
  initScrollMagic();
}, 200);

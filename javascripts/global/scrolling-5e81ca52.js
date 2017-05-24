// init peekaboo and autoscroll for expanded feature content
$('.peekaboo').peekaboo({
  callback: (e) => {
    const element = e.event.currentTarget;
    const targetContent = '#' + element.getAttribute("aria-controls");
    const isExpanded = element.getAttribute("aria-expanded");
    const headerHeight = $('.header').height();

    if (isExpanded == "true") { // inverted check since peekaboo changes attribute before we get here...
      // scroll to the section
      TweenLite.to(window, 1, { scrollTo: { y: targetContent, offsetY: headerHeight } });

      $('.header__nav li.active').removeClass('active');
      // highlight active section in nav
      $('.header__nav a[href$="#' + element.closest('.feature').id + '"]').parent().addClass('active');
    } else {
      const featureCopy = element.closest('.feature__wrapper');
      const _offsetY = headerHeight + 20;

      // scroll back up to copy
      TweenLite.to(window, 1, { scrollTo: { y: featureCopy, offsetY: _offsetY } });
    }
  }
});

// main nav scroll-to functionality
const urlPathHash = window.location.pathname + window.location.hash;
$(".header__nav a, .footer__main-nav a, .footer__resource-nav a").each(function(index, element) {
  const href = element.getAttribute("href");
  const url = window.location.href;
  const currentHref = urlPathHash.replace(/^\//, '');

  if (currentHref == href) {
    $('.header__nav li.active').removeClass('active'); // remove active class if set inline for some odd reason
    $('.header__nav a[href$="' + href + '"]').parent().addClass('active');
  }

  $(this).click(function(e) {
    if (href && href != '#' && (href.indexOf('index.html#') != -1)) {
      if (url.indexOf('index.html') == -1 && window.location.pathname != '/') {
        return;
      }

      const headerHeight = $('.header').height();

      // if main nav is active (mobile), let's close the nav
      $('.header__nav.header__nav--active').removeClass('header__nav--active');
      $('.header__nav li.active').removeClass('active');

      // highlight active section in nav
      $('.header__nav a[href$="' + href + '"]').parent().addClass('active');

      // scroll to the section
      e.preventDefault(); // override default browser behavior

      const href_id = '#' + href.split('#')[1];
      TweenLite.to(window, 1, { scrollTo: { y: href_id, offsetY: headerHeight - 150 }, ease: Power2.easeInOut });
    }
  });
});

// collapse feature content on button click
$(document).on('click', '.js-toggle-content', function() {
  const shallWeExpand = $(this).data('expand'); // LPT: anything is possible!
  const section = $(this).data('controls');
  const $targetButton = $('[aria-controls="'+ section +'"]');

  if ($targetButton &&
      ((!shallWeExpand || shallWeExpand == false) ||
      (shallWeExpand && shallWeExpand == true && $targetButton.attr("aria-expanded") == 'false'))
    ) {
    $targetButton.click();
  }
});

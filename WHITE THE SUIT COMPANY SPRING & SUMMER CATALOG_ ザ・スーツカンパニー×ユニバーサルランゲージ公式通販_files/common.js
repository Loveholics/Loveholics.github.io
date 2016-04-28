var Navi, ScrollDispIn;

(function() {
  var _pathName;
  _pathName = location.pathname;
  if (/iphone|ipad|ipod|android/.test(window.navigator.userAgent.toLowerCase())) {
    return location.href = location.protocol + '//' + location.host + _pathName + 'sp/' + location.search;
  } else {

  }
})();

Navi = (function() {
  function Navi(target) {
    this.$target = $(target);
    this.$targetBtn = this.$target.find('li[data-scroll-to]');
    this.navi_position = parseInt(this.$target.css('top'));
    this.navi_height = parseInt(this.$target.css('height'));
  }

  Navi.prototype.setPosition = function() {
    var that;
    that = this;
    $(window).on('scroll', function() {
      var scroll_num;
      scroll_num = $(this).scrollTop();
      if (that.navi_position <= scroll_num) {
        that.$target.addClass('fix');
      } else {
        that.$target.removeClass('fix');
      }
    }).trigger('scroll');
  };

  Navi.prototype.scrollAnchor = function() {
    this.$targetBtn.on('click', function() {
      var to;
      to = $(this).attr('data-scroll-to');
      $(to).velocity("scroll", {
        duration: 600,
        easing: 'ease-out'
      });
    });
  };

  Navi.prototype.init = function() {
    this.scrollAnchor();
    this.setPosition();
  };

  return Navi;

})();

ScrollDispIn = (function() {
  var $window, support_transform, support_transition, timer;

  $window = $(window);

  timer = 200;

  support_transform = false;

  support_transition = false;

  function ScrollDispIn(target_block) {
    var elem;
    this.$target_block = $(target_block);
    elem = $("<div>");
    if (typeof elem.css("transform") === "string") {
      support_transform = true;
    }
    if (typeof elem.css("transitionProperty") === "string") {
      support_transition = true;
    }
  }

  ScrollDispIn.prototype.setDispIn = function() {
    var scroll_num, w_height;
    scroll_num = $window.scrollTop();
    w_height = $window.height();
    $.each(this.$target_block, function() {
      var $inner, $this, fn, i, j, num, offet_top, posi, ref;
      $this = $(this);
      posi = 200;
      offet_top = $this.offset().top;
      num = (scroll_num + w_height) - offet_top - posi;
      if (num > 0 && !$this.hasClass('disp')) {
        $this.addClass('disp');
        $inner = $this.find('.js-scroll-block');
        fn = function() {
          var ii;
          ii = i;
          setTimeout(function() {
            return $inner.eq(ii).addClass('disp');
          }, timer * ii);
        };
        for (i = j = 0, ref = $inner.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          fn();
        }
      }
    });
  };

  ScrollDispIn.prototype.eventHundle = function(e) {
    e.data.setDispIn();
  };

  ScrollDispIn.prototype.potitionInit = function() {
    if (!support_transition) {
      $('.js-scroll-block').css({
        opacity: 1
      });
      $('.js-scroll').css({
        opacity: 1
      });
    }
  };

  ScrollDispIn.prototype.init = function() {
    this.potitionInit();
    $window.on('scroll resize', this, this.eventHundle).trigger('scroll');
  };

  return ScrollDispIn;

})();

$(function() {
  var navi, scrolldispin;
  navi = new Navi('.navigation');
  navi.init();
  scrolldispin = new ScrollDispIn('.js-scroll');
  return scrolldispin.init();
});

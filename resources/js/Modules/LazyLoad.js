import $ from 'jquery';
import { Map } from '../Components/Map';



export class LazyLoading {
  constructor() {
    this.lazyLoadTimeout = null;
    this.map = null;
    this._init();
    this._events();
  }

  _init() {
    this.initLazyLoad();
  }

  _events() {
    let that = this;
    $(window).on('scroll', $.proxy(this._lazyLoadHandler, that));
  }

  _lazyLoadHandler() {
    clearTimeout(this.lazyLoadTimeout);

    this.lazyLoadTimeout = setTimeout(() => {
      this.initLazyLoad();
    }, 200);
  }

  initLazyLoad() {
    let windowTopPosition = $(window)[0].pageYOffset,
      windowBottomPosition = $(window)[0].pageYOffset + $(window)[0].innerHeight,
      $items = $('[data-bg-src], [data-src*="img"], [data-map]'),
      showOffsets = $(window)[0].innerHeight * 0.5;

    if(!$items.length) {
      $(window).unbind('scroll', this._lazyLoadHandler);
    }

    if(window.matchMedia('(max-width: 768px)').matches) {
      showOffsets = $(window)[0].innerHeight;
    }

    $items.each((i, item) => {
      if(
        (windowTopPosition - ($(item).offset().top + $(item).height) <= showOffsets) ||
        (windowBottomPosition + showOffsets >= $(item).offset().top)
      ) {
        this._setSource(item);
      }
    });

  }


  _setSource(img) {
    console.log(img);
    if(img.hasAttribute('data-bg-src')) {
      $(img).css({
        'background-image' : `url(${ img.getAttribute('data-bg-src') })`
      });

      img.removeAttribute('data-bg-src');
      img.setAttribute('data-bg', '');
    } else if(img.hasAttribute('data-src')) {
      img.setAttribute('src', img.getAttribute('data-src'));

      img.onload = () => {
        img.removeAttribute('data-src');
      };
    } else if(!this.map && img.hasAttribute('data-map')) {
      this.map = new Map({
        selector : '#map'
      });
    }

  }
}
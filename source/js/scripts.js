import Swiper, {Navigation, Pagination} from 'swiper';
import FormValidator from './modules/FormValidator.js';
import Modal from './modules/Modal.js';

document.addEventListener('DOMContentLoaded', () => {
  new FormValidator({
    formSelector: '.form__inner',
    submitBtnSelector: '.form__button',
    inputContainerSelector: '.form-elem',
    clearBtnSelector: '.form-elem__icon',
    messageSelector: '.form-elem__message',
    inputSelector: '.form-elem__input',
    errorClass: 'form-elem--error',
    successClass: 'form-elem--success',
    modal: new Modal({
      modalElem: document.querySelector('.modal'),
      closeBtnElems: [
        document.querySelector('.modal__close'),
        document.querySelector('.modal__button')
      ]
    })
  }).init();

  new Swiper('.slider', {
    modules: [Navigation, Pagination],
    direction: 'horizontal',
    loop: true,

    breakpoints: {
      360: {
        slidesPerView: 2,
        spaceBetween: 8
      },
      520: {
        slidesPerView: 3,
        spaceBetween: 8
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 8
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 8
      },
      1400: {
        slidesPerView: 5,
        spaceBetween: 16
      },
      1920: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    },

    pagination: {
      el: '.slider-pagination',
      bulletClass: 'slider-pagination__bullet',
      bulletActiveClass: 'slider-pagination__bullet--active'
    },

    navigation: {
      prevEl: '.slider-navigation__button--prev',
      nextEl: '.slider-navigation__button--next'
    }
  });
});

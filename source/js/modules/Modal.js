import gsap from 'gsap';

export default class Modal {
  keyCodes = {
    space: 32,
    enter: 13,
    escape: 27
  };

  animationDuration = '0.3';

  constructor({modalElem, closeBtnElems}) {
    this.modal = modalElem;
    this.closeBtns = closeBtnElems;
  }

  modalOpen = () => {
    this.preventInterfaceRattlingOnOpen();
    this.disableDocumentScroll();
    this.closeBtns.forEach((closeBtn) => {
      closeBtn.addEventListener('click', this.onCloseBtnClick);
    });
    window.addEventListener('keydown', this.onWindowKeydown);
    window.addEventListener('click', this.onWindowClick);

    gsap.fromTo(
      this.modal,
      {
        display: 'none',
        opacity: 0
      },
      {
        display: 'block',
        opacity: 1,
        duration: this.animationDuration
      }
    );
  };

  onCloseBtnClick = () => {
    this.modalClose();
  };

  onWindowKeydown = (evt) => {
    if (evt.keyCode === this.keyCodes.escape) {
      this.modalClose();
    }
  };

  onWindowClick = (evt) => {
    if (evt.target.classList.contains('modal') && window.innerWidth >= 768) {
      this.modalClose();
    }
  };

  modalClose = () => {
    this.preventInterfaceRattlingOnClose();
    this.allowDocumentScroll();
    this.closeBtns.forEach((closeBtn) => {
      closeBtn.removeEventListener('click', this.onCloseBtnClick);
    });
    window.removeEventListener('keydown', this.onWindowKeydown);
    window.removeEventListener('click', this.onWindowClick);

    gsap.fromTo(
      this.modal,
      {opacity: 1, display: 'block'},
      {
        display: 'none',
        opacity: 0,
        duration: this.animationDuration
      }
    );
  };

  preventInterfaceRattlingOnOpen = () => {
    document.body.style.paddingRight = this.getScrollWidth() + 'px';
  };

  preventInterfaceRattlingOnClose = () => {
    document.body.style.paddingRight = 0;
    this.modal.style.marginRight = '-' + this.getScrollWidth() + 'px';
    setTimeout(() => (this.modal.style.marginRight = 0), 200);
  };

  disableDocumentScroll = () => {
    document.querySelector('html').style.overflow = 'hidden';
    document.querySelector('html').style.touchAction = 'none';
    document.addEventListener('touchmove', this.onDocumentTouchmove);
  };

  allowDocumentScroll = () => {
    document.querySelector('html').style.overflow = 'auto';
    document.querySelector('html').style.touchAction = '';
    document.removeEventListener('touchmove', this.onDocumentTouchmove, {
      passive: true
    });
  };

  onDocumentTouchmove = (evt) => {
    evt.preventDefault();
  };

  getScrollWidth = () => {
    var inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';

    var outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;

    if (w1 == w2) {
      w2 = outer.clientWidth;
    }

    document.body.removeChild(outer);
    return w1 - w2;
  };
}

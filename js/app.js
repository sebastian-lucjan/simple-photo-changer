import '../sass/style.scss';

document.addEventListener('DOMContentLoaded', init);

function init() {
  const imagesContainerEl = document.querySelector('.slider__images-container');
  const imgEl1 = document.querySelector('.slider__image-container--first img');
  const imgEl2 = document.querySelector('.slider__image-container--second img');
  let dragging = false;
  const imgContainerEl1 = document.querySelector('.slider__image-container--first');
  const imgContainerEl2 = document.querySelector('.slider__image-container--second');
  const handleElement = document.querySelector('.slider__handle');
  const dividerElement = document.querySelector('.slider__divider');
  let imagesContainerWidth;
  let imagesContainerLeftOffset;

  function initEvent() {
    handleElement.addEventListener('mousedown', () => {
      dragging = true;
    });
    window.addEventListener('mouseup', () => {
      if (dragging) {
        dragging = false;
      }
    });
    document.querySelector('.slider').addEventListener('mouseleave', () => {
      dragging = false;
    });
    window.addEventListener('mousemove', (event) => {
      console.log(dragging);
      if (dragging) {
        move(event.clientX);
      }
    });
  }

  function move(clientX) {
    const offset = getOffset(clientX);
    const percent = (offset / imagesContainerWidth) * 100;
    console.log(dividerElement, imgContainerEl2);
    dividerElement.style.left = percent + '%';
    imgContainerEl2.style.width = percent + '%';
  }

  function getOffset(clientX) {
    const offset = clientX - imagesContainerLeftOffset;
    if (offset < 0) {
      return 0;
    } else if (offset > imagesContainerWidth) {
      return imagesContainerWidth;
    } else {
      return offset;
    }
  }

  function adjustImageSize() {
    imagesContainerLeftOffset = imagesContainerEl.offsetLeft;
    imagesContainerWidth = imagesContainerEl.offsetWidth;
    imgEl1.style.width = imagesContainerWidth + 'px';
    imgEl2.style.width = imagesContainerWidth + 'px';
  }

  window.addEventListener('resize', adjustImageSize);

  adjustImageSize();
  initEvent();
}

import galleryItems from './app.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    modalOpen: document.querySelector('.js-lightbox'),
    modalClose: document.querySelector('button[data-action="close-lightbox"]'),
    lightbox: document.querySelector('.lightbox__image'),
    backDrop: document.querySelector('.lightbox__overlay'),
}

let activeImage = 0;

function makeImageGalleryMarkup(galleryItems) {
    return galleryItems.map(({preview, original, description}, index) => {
        return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    data-index="${index}"
                />
            </a>
        </li>`;
    }).join('');
}

const galleryMarkup = makeImageGalleryMarkup(galleryItems);
refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);


const handleOpenModal = (event) => {
    if (!event.target.classList.contains('gallery__image')) {
        return;
    }
    window.addEventListener('keydown', onEscKeyDown);
    window.addEventListener('keyup', sliderKeydown);

    event.preventDefault();

    const activeItem = event.target;

    refs.modalOpen.classList.add('is-open');
    activeImage = +event.target.dataset.index;
    updateImage(activeItem.dataset.source, activeItem.alt)
}

const handleCloseModal = () => {
    window.removeEventListener('keydown', onEscKeyDown);
    refs.modalOpen.classList.remove('is-open');
    updateImage();
}

function updateImage(src = '', alt = '') {
    refs.lightbox.src = src;
    refs.lightbox.alt = alt;
}

const onOverlayClose = (event) => {
    if (event.currentTarget === event.target) {
        handleCloseModal();
    }
}

const onEscKeyDown = (event) => {
    if (event.code === 'Escape') {
        handleCloseModal();
    }
}

const galleryItemLength = galleryItems.length - 1;

function sliderKeydown(event) {
    const LEFT_KEY_CODE = 'ArrowLeft';
    const RIGHT_KEY_CODE = 'ArrowRight';
    const isLeft = event.code === LEFT_KEY_CODE;
    const isRight = event.code === RIGHT_KEY_CODE

    if (isLeft) {
        activeImage -= 1;
        if (activeImage < 0) {
            activeImage = galleryItemLength;
        }
    } else if (isRight) {
        activeImage += 1;
        if (activeImage > galleryItemLength) {
            activeImage = 0;
        }
    }

    refs.lightbox.src = galleryItems[activeImage].original;
}

refs.gallery.addEventListener('click', handleOpenModal);
refs.modalClose.addEventListener('click', handleCloseModal);
refs.backDrop.addEventListener('click', onOverlayClose);


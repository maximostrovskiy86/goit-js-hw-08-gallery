import galleryItems from './app.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    modalOpen: document.querySelector('.js-lightbox'),
    modalClose: document.querySelector('button[data-action="close-lightbox"]'),
    lightbox: document.querySelector('.lightbox__image'),
    backDrop: document.querySelector('.lightbox__overlay'),
}

function makeImageGalleryMarkup(galleryItems) {
    return galleryItems.map(({preview, original, description}) => {
        return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`;
    }).join('');
}

const galleryMarkup = makeImageGalleryMarkup(galleryItems);
refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);


const handleOpenModal = (event) => {
    window.addEventListener('keydown', onEscKeyDown);
    window.addEventListener('keydown', sliderKeydown);

    event.preventDefault();

    const activeItem = event.target;

    refs.modalOpen.classList.add('is-open');
    refs.lightbox.src = activeItem.dataset.source;
    refs.lightbox.alt = activeItem.alt;
}

const handleCloseModal = () => {
    window.removeEventListener('keydown', onEscKeyDown);

    refs.lightbox.src = '';
    refs.lightbox.alt = '';
    refs.modalOpen.classList.remove('is-open');
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

// слайдер в работе
function sliderKeydown(event) {
    const items = refs.gallery.querySelectorAll('.gallery__item');
    const activeItem = event.target;
    console.log(activeItem)

    // const LEFT_KEY_CODE = 'ArrowLeft';
    // const isLeft = event.code === LEFT_KEY_CODE;
    // const RIGHT_KEY_CODE = 'ArrowRight';
    // return items.forEach((item, index) => {
    //     if (isLeft) {
    //         console.log(item[index - 1])
    //         return item[index - 1];
    //         // console.log(activeItem.previousSibling)
    //     }
    // });
}
// слайдер в работе

refs.gallery.addEventListener('click', handleOpenModal);
refs.modalClose.addEventListener('click', handleCloseModal);
refs.backDrop.addEventListener('click', onOverlayClose);


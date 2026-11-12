// Pet project galleries: clicking a thumbnail opens a PhotoSwipe lightbox
// (swipe / arrow keys to scroll, Esc or the X button to close).
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export function initGalleries() {
    const lightbox = new PhotoSwipeLightbox({
        gallery: '[data-gallery]', // every <ul data-gallery> is its own gallery
        children: 'a',             // each <a> inside it is one slide
        pswpModule: () => import('photoswipe'), // the heavy part loads only on first click
        bgOpacity: 0.92,
    });

    // Show the thumbnail's alt text as a caption under the big image.
    lightbox.on('uiRegister', () => {
        lightbox.pswp.ui.registerElement({
            name: 'caption',
            appendTo: 'root',
            className: 'gallery-caption',
            onInit: (element, pswp) => {
                pswp.on('change', () => {
                    element.textContent = pswp.currSlide.data.element?.querySelector('img')?.alt ?? '';
                });
            },
        });
    });

    lightbox.init();
}

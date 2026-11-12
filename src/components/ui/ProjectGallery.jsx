// Screenshots of one pet project: a big cover image + a scrollable strip of thumbnails.
// A click opens the lightbox (yet-another-react-lightbox):
// swipe or ← → to scroll, Esc or X to close, captions show each screenshot's alt text.
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import { asset } from '../../lib/asset.js';
import Icon from './Icon.jsx';

const THUMB_WIDTH = 640; // size made by `npm run thumbs`

// The lightbox wants "slides". The big view always shows the original PNG.
function toSlide(image) {
    return {
        src: asset(image.src),
        alt: image.alt,
        description: image.alt,
        width: image.width,
        height: image.height,
    };
}

export default function ProjectGallery({ project }) {
    const [openIndex, setOpenIndex] = useState(-1); // -1 = lightbox closed
    const [captionsShown, setCaptionsShown] = useState(false); // phones: a tap on the image toggles the caption
    const [cover, ...rest] = project.images;

    function closeLightbox() {
        setOpenIndex(-1);
        setCaptionsShown(false);
    }

    return (
        <div className="flex min-w-0 flex-col gap-3">
            <button
                type="button"
                onClick={() => setOpenIndex(0)}
                className="group relative block cursor-zoom-in overflow-hidden rounded-2xl border border-disabled bg-footer"
            >
                {/* The big cover uses the original PNG: the 640px thumb looks blurry at this size */}
                <img
                    src={asset(cover.src)}
                    alt={cover.alt}
                    width={cover.width}
                    height={cover.height}
                    className="aspect-video w-full object-cover object-top transition-[scale] duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute right-3 bottom-3 flex items-center gap-2 rounded-full bg-body/85 px-3.5 py-1.5 font-title text-[13px] text-white backdrop-blur">
                    <Icon name="images" className="size-4" />
                    {project.images.length} screenshots
                </span>
            </button>

            {/* Horizontal strip: scrolls sideways, snaps to each thumbnail */}
            <ul className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-2 [scrollbar-width:thin]">
                {rest.map((image, i) => (
                    <li key={image.src} className="shrink-0 snap-start">
                        <button
                            type="button"
                            onClick={() => setOpenIndex(i + 1)}
                            className="block cursor-zoom-in overflow-hidden rounded-lg border border-disabled bg-footer transition-[border-color] hover:border-body"
                        >
                            <img
                                src={asset(image.thumb)}
                                alt={image.alt}
                                width={THUMB_WIDTH}
                                height={360}
                                loading="lazy"
                                decoding="async"
                                className="aspect-video w-[132px] object-cover object-top w580:w-[112px]"
                            />
                        </button>
                    </li>
                ))}
            </ul>

            <Lightbox
                open={openIndex >= 0}
                index={Math.max(openIndex, 0)}
                close={closeLightbox}
                slides={project.images.map(toSlide)}
                // The caption bar is hidden until you hover the image (mouse) or tap it (phone), see main.css
                className={captionsShown ? 'lightbox--captions-shown' : ''}
                on={{ click: () => setCaptionsShown((shown) => !shown) }}
                plugins={[Captions, Counter, Zoom]}
                captions={{ descriptionTextAlign: 'center', descriptionMaxLines: 4 }}
                carousel={{ finite: true }}
                zoom={{ maxZoomPixelRatio: 2 }}
                styles={{ container: { backgroundColor: 'rgb(20, 20, 20)' } }}
            />
        </div>
    );
}

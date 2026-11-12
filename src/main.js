// Entry point: index.html loads this file. Each feature lives in its own module in src/js/.
import { initGalleries } from './js/gallery.js';
import { initCopyPrompt } from './js/copy-prompt.js';

initGalleries();
initCopyPrompt();

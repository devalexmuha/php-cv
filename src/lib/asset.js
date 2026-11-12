// Builds a URL to a file in public/ (like Laravel's asset() helper).
// BASE_URL comes from `base` in vite.config.js, so paths keep working
// on GitHub Pages under /php-cv/.
export function asset(path) {
    return import.meta.env.BASE_URL + path;
}

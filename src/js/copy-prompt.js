// Gemini has no link that pre-fills a prompt, so on click we copy the prompt
// to the clipboard and let the link open Gemini as usual: the visitor just pastes.
export function initCopyPrompt() {
    document.querySelectorAll('[data-copy-prompt]').forEach((link) => {
        link.addEventListener('click', () => {
            navigator.clipboard?.writeText(link.dataset.copyPrompt).catch(() => {});
        });
    });
}

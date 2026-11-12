// Keyboard shortcuts: → next step, ← previous step, Home = start, End = contacts.
import { useEffect } from 'react';

export function useKeyboardNavigation({ next, back, start, end }) {
    useEffect(() => {
        function onKeyDown(event) {
            if (event.altKey || event.ctrlKey || event.metaKey || event.defaultPrevented) return;

            // Don't steal keys while the visitor types, reads the contents menu
            // or browses screenshots (the lightbox uses ← → itself).
            const target = event.target instanceof Element ? event.target : document.body;
            if (target.closest('input, textarea, select, [contenteditable], dialog[open]')) return;
            if (document.querySelector('.yarl__portal')) return;

            const actions = { ArrowRight: next, ArrowLeft: back, Home: start, End: end };
            const action = actions[event.key];
            if (!action) return;

            event.preventDefault();
            action();
        }

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [next, back, start, end]);
}

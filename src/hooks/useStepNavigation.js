// Which step is on screen, and functions to move between steps.
//
// The URL hash (#/skills) is the single source of truth:
//   - goTo() only changes the hash,
//   - a 'hashchange' listener updates the state.
// That way the browser's own Back/Forward buttons and shared links work for free,
// and GitHub Pages never sees a "real" URL it doesn't know (no 404s).
import { useCallback, useEffect, useState } from 'react';

function indexFromHash(steps) {
    const id = window.location.hash.replace(/^#\/?/, '');
    const index = steps.findIndex((step) => step.id === id);
    return index === -1 ? 0 : index;
}

export function useStepNavigation(steps) {
    // direction: 1 = going deeper (forward), -1 = coming back. Used by the animation.
    const [state, setState] = useState(() => ({ index: indexFromHash(steps), direction: 1 }));

    useEffect(() => {
        function onHashChange() {
            setState((previous) => {
                const index = indexFromHash(steps);
                return { index, direction: index >= previous.index ? 1 : -1 };
            });
        }
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, [steps]);

    const goTo = useCallback(
        (index) => {
            const safeIndex = Math.max(0, Math.min(steps.length - 1, index));
            window.location.hash = `/${steps[safeIndex].id}`;
        },
        [steps],
    );

    const { index, direction } = state;

    return {
        index,
        direction,
        step: steps[index],
        nextStep: steps[index + 1] ?? null,
        isFirst: index === 0,
        isLast: index === steps.length - 1,
        goTo,
        next: useCallback(() => goTo(index + 1), [goTo, index]),
        back: useCallback(() => goTo(index - 1), [goTo, index]),
        start: useCallback(() => goTo(0), [goTo]),
        end: useCallback(() => goTo(steps.length - 1), [goTo, steps.length]),
    };
}

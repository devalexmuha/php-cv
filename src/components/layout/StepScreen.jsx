// Wraps one step and animates it. Going forward, the new step rises from below
// while the old one floats up and away, as if you were diving deeper into the CV.
// Going back plays the same movement in reverse.
//
// If a step is taller than the screen (phones, small laptops) it scrolls inside,
// and a soft white fade at the bottom hints that there is more to read.
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const variants = {
    enter: (direction) => ({ opacity: 0, y: direction > 0 ? 70 : -70, scale: direction > 0 ? 0.97 : 1.03 }),
    center: { opacity: 1, y: 0, scale: 1 },
    exit: (direction) => ({ opacity: 0, y: direction > 0 ? -70 : 70, scale: direction > 0 ? 1.03 : 0.97 }),
};

export default function StepScreen({ direction, label, children }) {
    const ref = useRef(null);
    const [hasMoreBelow, setHasMoreBelow] = useState(false);

    // Move keyboard / screen reader focus to the new step, so Tab starts from here.
    useEffect(() => {
        ref.current?.focus({ preventScroll: true });
    }, []);

    // Show the fade only while there is unseen content below.
    useEffect(() => {
        const element = ref.current;
        const update = () => setHasMoreBelow(element.scrollHeight - element.scrollTop - element.clientHeight > 8);

        update();
        element.addEventListener('scroll', update, { passive: true });
        const observer = new ResizeObserver(update); // re-check when images load or the window resizes
        observer.observe(element);
        observer.observe(element.firstElementChild);

        return () => {
            element.removeEventListener('scroll', update);
            observer.disconnect();
        };
    }, []);

    return (
        <motion.section
            ref={ref}
            tabIndex={-1}
            aria-label={label}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-y-auto overscroll-contain outline-none"
        >
            {/* min-h-full + justify-center: short steps sit in the middle, long ones scroll inside */}
            <div className="page-container flex min-h-full flex-col justify-center py-8 w880:justify-start h760:py-6">{children}</div>

            <div
                aria-hidden="true"
                className={`pointer-events-none sticky bottom-0 -mt-16 h-16 bg-linear-to-t from-white to-transparent transition-opacity duration-300 ${
                    hasMoreBelow ? 'opacity-100' : 'opacity-0'
                }`}
            />
        </motion.section>
    );
}

// Bottom bar, always visible: Back one step, To the start, the step counter, and Next.
import Icon from '../ui/Icon.jsx';

const pad = (number) => String(number).padStart(2, '0');

export default function StepNav({ total, navigation }) {
    const { index, nextStep, isFirst, isLast, back, next, start } = navigation;

    return (
        <nav aria-label="Step navigation" className="relative z-20 shrink-0 border-t border-disabled/70 bg-white">
            <div className="page-container relative flex h-[76px] items-center gap-3 w580:h-[68px] w580:gap-2">
                <button type="button" className="btn btn--outline w580:size-11 w580:px-0" onClick={back} disabled={isFirst} aria-label="Back one step">
                    <Icon name="chevron-left" />
                    <span className="w580:hidden">Back</span>
                </button>
                {/* Not shown on the last step, where "Back to start" is already the main button */}
                {!isLast && (
                    <button type="button" className="btn btn--outline btn--icon" onClick={start} disabled={isFirst} aria-label="To the start" title="To the start">
                        <Icon name="home" />
                    </button>
                )}

                {/* Absolutely centered in the bar, so it never shifts when the buttons change width */}
                <p
                    className="absolute left-1/2 -translate-x-1/2 text-center font-title text-[14px] text-body/55 tabular-nums"
                    aria-live="polite"
                >
                    <span className="text-body">{pad(index + 1)}</span> / {pad(total)}
                </p>

                {isLast ? (
                    // On phones only the home icon is shown (a round button, like Back)
                    <button type="button" className="btn btn--primary ml-auto w580:size-11 w580:px-0" onClick={start} aria-label="Back to start">
                        <Icon name="home" />
                        <span className="w580:hidden">Back to start</span>
                    </button>
                ) : (
                    // max-w + truncate: a long label ends with "…" instead of running into the centered counter
                    <button type="button" className="btn btn--primary ml-auto max-w-[calc(50%-3rem)]" onClick={next}>
                        <span className="truncate">
                            Next<span className="w580:hidden">: {nextStep.label}</span>
                        </span>
                        <Icon name="chevron-right" className="size-5 shrink-0" />
                    </button>
                )}
            </div>
        </nav>
    );
}

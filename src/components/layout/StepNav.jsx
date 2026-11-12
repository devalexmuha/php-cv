// Bottom bar, always visible: Back one step, To the start, the step counter, and Next.
import Icon from '../ui/Icon.jsx';

const pad = (number) => String(number).padStart(2, '0');

export default function StepNav({ total, navigation }) {
    const { index, step, nextStep, isFirst, isLast, back, next, start } = navigation;

    return (
        <nav aria-label="Step navigation" className="relative z-20 shrink-0 border-t border-disabled/70 bg-white">
            <div className="page-container flex h-[76px] items-center gap-3 w580:h-[68px] w580:gap-2">
                <button type="button" className="btn btn--outline w580:size-11 w580:px-0" onClick={back} disabled={isFirst} aria-label="Back one step">
                    <Icon name="chevron-left" />
                    <span className="w580:hidden">Back</span>
                </button>
                <button type="button" className="btn btn--outline btn--icon" onClick={start} disabled={isFirst} aria-label="To the start" title="To the start">
                    <Icon name="home" />
                </button>

                <p className="mx-auto text-center font-title text-[14px] text-body/55 tabular-nums" aria-live="polite">
                    <span className="text-body">{pad(index + 1)}</span> / {pad(total)}
                    <span className="w880:hidden"> · {step.label}</span>
                </p>

                {isLast ? (
                    <button type="button" className="btn btn--primary" onClick={start}>
                        <Icon name="home" />
                        <span>Back to start</span>
                    </button>
                ) : (
                    <button type="button" className="btn btn--primary" onClick={next}>
                        <span>
                            Next<span className="w580:hidden">: {nextStep.label}</span>
                        </span>
                        <Icon name="chevron-right" />
                    </button>
                )}
            </div>
        </nav>
    );
}

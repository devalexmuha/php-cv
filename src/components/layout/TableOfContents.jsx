// "Contents" button + side panel listing every step, so the visitor can jump anywhere.
// Uses the native <dialog> element: Esc closes it and focus stays inside for free.
import { useRef } from 'react';
import Icon from '../ui/Icon.jsx';

const pad = (number) => String(number).padStart(2, '0');

export default function TableOfContents({ steps, navigation }) {
    const dialogRef = useRef(null);
    const { index: currentIndex, goTo } = navigation;

    const open = () => dialogRef.current.showModal();
    const close = () => dialogRef.current.close();

    function jumpTo(index) {
        goTo(index);
        close();
    }

    return (
        <>
            <button type="button" className="btn btn--outline btn--icon" onClick={open} aria-haspopup="dialog" aria-label="Open contents">
                <Icon name="menu" />
            </button>

            <dialog
                ref={dialogRef}
                aria-label="Contents"
                // A click on the dark backdrop lands on <dialog> itself -> close it
                onClick={(event) => event.target === dialogRef.current && close()}
                className="m-0 ml-auto h-dvh max-h-none w-[min(420px,100vw)] max-w-none bg-white p-0 text-body backdrop:bg-body/40 backdrop:backdrop-blur-[2px]"
            >
                <div className="flex h-full flex-col px-6 py-5">
                    <div className="flex items-center justify-between">
                        <p className="kicker">Contents</p>
                        <button type="button" className="btn btn--outline btn--icon" onClick={close} aria-label="Close contents">
                            <Icon name="close" />
                        </button>
                    </div>

                    <ol className="mt-6 flex flex-col gap-1 overflow-y-auto">
                        {steps.map((step, index) => {
                            const isCurrent = index === currentIndex;
                            return (
                                <li key={step.id}>
                                    <button
                                        type="button"
                                        onClick={() => jumpTo(index)}
                                        aria-current={isCurrent ? 'step' : undefined}
                                        className={`flex w-full cursor-pointer items-baseline gap-4 rounded-xl px-4 py-3 text-left transition-colors ${
                                            isCurrent ? 'bg-body text-white' : 'hover:bg-footer'
                                        }`}
                                    >
                                        <span className={`font-title text-[13px] tabular-nums ${isCurrent ? 'text-white/60' : 'text-body/40'}`}>
                                            {pad(index + 1)}
                                        </span>
                                        <span className="flex flex-col">
                                            <span className="font-title text-[18px] font-semibold">{step.label}</span>
                                            {step.chapter !== step.label && (
                                                <span className={`text-[15px] ${isCurrent ? 'text-white/70' : 'text-body/55'}`}>{step.chapter}</span>
                                            )}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </dialog>
        </>
    );
}

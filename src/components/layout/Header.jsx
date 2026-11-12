// Top bar: "CV" logo (back to start), chapter tabs, contents menu, LinkedIn,
// and a thin progress line that grows as the visitor goes deeper.
import { asset } from '../../lib/asset.js';
import TableOfContents from './TableOfContents.jsx';

const LINKEDIN = 'https://www.linkedin.com/in/oleksandr-harazha-31910b314/';

export default function Header({ steps, chapters, navigation }) {
    const { index, step, goTo } = navigation;
    const progress = ((index + 1) / steps.length) * 100;

    return (
        <header className="relative z-20 shrink-0 border-b border-disabled/70 bg-white">
            <div className="page-container flex h-[72px] items-center gap-6 w580:h-16 w580:gap-3">
                <button
                    type="button"
                    onClick={() => goTo(0)}
                    className="cursor-pointer font-title text-[50px] leading-none font-semibold w580:text-[34px]"
                    aria-label="CV, back to the start"
                >
                    CV
                </button>

                <div className="ml-auto flex items-center gap-3 w1100:ml-auto">
                    <a
                        href={LINKEDIN}
                        target="_blank"
                        rel="noopener"
                        className="flex items-center gap-2.5 font-title text-[16px] text-body"
                        aria-label="Oleksandr Harazha on LinkedIn"
                    >
                        <img src={asset('media/images/icons/linkedin-icon.svg')} alt="" className="size-7" />
                        <span className="w880:hidden">Oleksandr Harazha</span>
                    </a>
                    <TableOfContents steps={steps} navigation={navigation} />
                </div>
            </div>

            <div className="absolute inset-x-0 -bottom-px h-0.5" aria-hidden="true">
                <div className="h-full bg-secondary transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
        </header>
    );
}

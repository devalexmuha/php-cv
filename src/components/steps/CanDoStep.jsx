// Step 3: what I can do for a business, as three numbered cards.
import cv from '../../data/cv.json';

export default function CanDoStep() {
    const { canDo } = cv;

    return (
        <div className="flex flex-col gap-10 h760:gap-6">
            <h2 className="title title--md">{canDo.title}</h2>

            <ol className="grid grid-cols-3 gap-6 w880:grid-cols-1">
                {canDo.paragraphs.map((paragraph, i) => (
                    <li key={i} className="card flex flex-col gap-5">
                        <span className="font-title text-[44px] leading-none font-semibold text-accent" aria-hidden="true">
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text">{paragraph}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
}

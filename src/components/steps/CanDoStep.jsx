// Step 3: what I can do for a business. The heading, then one grey card
// (same style as the P.S. card in ValuesStep) with the paragraphs stacked inside.
import cv from '../../data/cv.json';

export default function CanDoStep() {
    const { canDo } = cv;

    return (
        <div className="flex flex-col gap-8 h760:gap-5">
            <h2 className="title title--md">{canDo.title}</h2>

            <div className="card flex flex-col gap-5 border-transparent bg-footer">
                {canDo.paragraphs.map((paragraph, i) => (
                    <p key={i} className="text">
                        {paragraph}
                    </p>
                ))}
            </div>
        </div>
    );
}

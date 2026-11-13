// Step 8: education and work experience, side by side.
// Both use the same simple timeline: a line on the left with a green dot per item.
import cv from '../../data/cv.json';
import { asset } from '../../lib/asset.js';
import RichText from '../ui/RichText.jsx';

const timeline = 'flex flex-col gap-8 border-l-2 border-disabled pl-7 w450:pl-5';
const timelineItem =
    "relative flex flex-col gap-2 before:absolute before:top-2 before:-left-[35px] before:size-3 before:rounded-full before:bg-secondary before:content-[''] w450:before:-left-[27px]";
const meta = 'font-title text-[14px] text-body/60';

export default function BackgroundStep() {
    const { education, experience } = cv;

    return (
        <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start gap-12 w1100:gap-8 w880:grid-cols-1">
            <section className="flex flex-col gap-6">
                <h2 className="title title--md">{education.title}</h2>
                <ol className={timeline}>
                    {education.items.map((item) => (
                        <li key={item.title} className={timelineItem}>
                            <h3 className="title title--sm">{item.title}</h3>
                            <p className={meta}>{item.lines.join(' · ')}</p>
                            <img src={asset(item.logo)} alt={item.logoAlt} className="mt-2 h-[90px] w-auto self-start w450:h-[72px]" />
                        </li>
                    ))}
                </ol>
            </section>

            <section className="flex flex-col gap-6">
                <h2 className="title title--md">{experience.title}</h2>
                <ol className={timeline}>
                    {experience.items.map((item) => (
                        <li key={item.title} className={timelineItem}>
                            <h3 className="title title--sm">{item.title}</h3>
                            <p className={meta}>
                                <RichText text={item.lines.join(' · ')} />
                            </p>
                            <p className="text">
                                <RichText text={item.text} />
                            </p>
                            {/* Optional company logo, same size as the college logo */}
                            {item.logo && (
                                <img src={asset(item.logo)} alt={item.logoAlt} className="mt-2 h-[90px] w-auto self-start rounded-xl w450:h-[72px]" />
                            )}
                        </li>
                    ))}
                </ol>
            </section>
        </div>
    );
}

// Step 8: education and work experience, side by side.
import cv from '../../data/cv.json';
import { asset } from '../../lib/asset.js';
import RichText from '../ui/RichText.jsx';

export default function BackgroundStep() {
    const { education, experience } = cv;

    return (
        <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start gap-12 w1100:gap-8 w880:grid-cols-1">
            <section className="flex flex-col gap-6">
                <h2 className="title title--md">{education.title}</h2>
                {education.items.map((item) => (
                    <article key={item.title} className="card flex flex-col gap-5">
                        <img src={asset(item.logo)} alt={item.logoAlt} className="h-[110px] w-auto self-start w450:h-[90px]" />
                        <h3 className="title title--sm">{item.title}</h3>
                        <div>
                            {item.lines.map((line) => (
                                <p key={line} className="text text-muted">
                                    {line}
                                </p>
                            ))}
                        </div>
                    </article>
                ))}
            </section>

            <section className="flex flex-col gap-6">
                <h2 className="title title--md">{experience.title}</h2>
                {/* A simple timeline: a line on the left with a dot per job */}
                <ol className="flex flex-col gap-8 border-l-2 border-disabled pl-7 w450:pl-5">
                    {experience.items.map((item) => (
                        <li
                            key={item.title}
                            className="relative flex flex-col gap-2 before:absolute before:top-2 before:-left-[35px] before:size-3 before:rounded-full before:bg-secondary before:content-[''] w450:before:-left-[27px]"
                        >
                            <h3 className="title title--sm">{item.title}</h3>
                            <p className="font-title text-[14px] text-body/60">{item.lines.join(' · ')}</p>
                            <p className="text">
                                <RichText text={item.text} />
                            </p>
                        </li>
                    ))}
                </ol>
            </section>
        </div>
    );
}

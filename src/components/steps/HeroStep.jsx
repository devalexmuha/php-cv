// Step 1: who I am. Photo, title, short "About me", Download CV, AI summary links,
// and a big button that starts the dive into the CV.
import cv from '../../data/cv.json';
import { asset } from '../../lib/asset.js';
import RichText from '../ui/RichText.jsx';
import AiSummarize from '../ui/AiSummarize.jsx';
import Icon from '../ui/Icon.jsx';

export default function HeroStep({ onNext }) {
    const { hero, person } = cv;

    return (
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-16 w1100:gap-10 w880:grid-cols-1 w880:gap-6">
            <div className="flex flex-col gap-5 h760:gap-4">
                <code className="font-main text-[17px] text-body/35 w450:text-[14px]">{hero.code}</code>
                <h1 className="title title--lg">{hero.title}</h1>
                <p className="text text-[22px] h760:text-[20px] w450:text-[19px]">{hero.tagline}</p>

                <div className="flex flex-col gap-2">
                    <h2 className="kicker">{hero.aboutTitle}</h2>
                    <p className="text max-w-[64ch] h760:text-[18px]">
                        <RichText text={hero.about} />
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                    <button type="button" onClick={onNext} className="btn btn--primary h-13 px-7 text-[17px]">
                        Dive into my CV
                        <Icon name="arrow-down" />
                    </button>
                    <a href={asset(person.resume)} download className="btn btn--text">
                        Download CV
                        <Icon name="download" />
                    </a>
                </div>

                <AiSummarize />
            </div>

            <figure className="w880:-order-1">
                <img
                    src={asset(person.photo)}
                    alt={person.photoAlt}
                    className="h-[min(64vh,560px)] w-auto rounded-3xl object-cover w880:h-[220px] w880:w-[176px] w880:object-top"
                />
            </figure>
        </div>
    );
}

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
        // Desktop: text column on the left, photo on the right.
        // Mobile (w880): the text column gets `contents`, so its children become items of this grid,
        // and `order` puts the photo between the tagline and "About me". One <img>, moved by CSS only.
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-16 w1100:gap-10 w880:grid-cols-1 w880:gap-8">
            <div className="flex flex-col gap-8 h760:gap-4 w880:contents">
                <div className="flex flex-col gap-5 h760:gap-4">
                    <code className="font-main text-[17px] text-body/35 w450:text-[14px]">{hero.code}</code>
                    <h1 className="title title--lg">{hero.title}</h1>
                    <p className="text text-[22px] h760:text-[20px] w450:text-[19px]">{hero.tagline}</p>
                </div>

                <div className="flex flex-col gap-2 w880:order-1">
                    <h2 className="kicker">{hero.aboutTitle}</h2>
                    <p className="text h760:text-[18px]">
                        <RichText text={hero.about} />
                    </p>
                </div>

                {/*
                    Buttons row. It reacts to its OWN width (container query), not the screen width:
                    600px+  Download CV ... Summarize: [icons]   (one line)
                    500px+  Download CV ... [icons]              ("Summarize:" hidden, see AiSummarize)
                    less    [icons] above Download CV, left-aligned (flex-wrap-reverse)
                */}
                <div className="@container/actions w880:order-1">
                    <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 @max-[500px]/actions:flex-wrap-reverse">
                        <a href={asset(person.resume)} download className="btn btn--primary h-13 px-7 text-[17px]">
                            Download CV
                            <Icon name="download" />
                        </a>
                        <AiSummarize />
                    </div>
                </div>
            </div>

            <figure>
                <img
                    src={asset(person.photo)}
                    alt={person.photoAlt}
                    className="h-[min(64vh,560px)] w-auto rounded-3xl object-cover w880:h-[480px] w880:w-full w880:object-top w520:aspect-square w520:h-auto w520:max-w-[480px]"
                />
            </figure>
        </div>
    );
}

// Step 2: hard skills, soft skills and the languages I speak, side by side in cards.
import cv from '../../data/cv.json';
import BulletList from '../ui/BulletList.jsx';

function SkillCard({ kicker, title, items }) {
    return (
        <section className="card flex flex-col gap-3 p-6">
            <div>
                {kicker && <p className="kicker">{kicker}</p>}
                <h3 className="title title--sm">{title}</h3>
            </div>
            <BulletList items={items} compact />
        </section>
    );
}

export default function SkillsStep() {
    const { skills } = cv;
    const [workWith, toStudy] = skills.hard.groups;

    return (
        <div className="flex flex-col gap-6 h760:gap-4">
            <h2 className="title title--md">{skills.title}</h2>

            <div className="grid grid-cols-[1.2fr_1fr_1fr] items-start gap-5 w1100:grid-cols-2 w580:grid-cols-1">
                <SkillCard kicker={skills.hard.title} title={workWith.title} items={workWith.items} />

                <div className="flex flex-col gap-5">
                    <SkillCard kicker={skills.hard.title} title={toStudy.title} items={toStudy.items} />
                    <SkillCard title={skills.languages.title} items={skills.languages.items} />
                </div>

                <SkillCard title={skills.soft.title} items={skills.soft.items} />
            </div>
        </div>
    );
}

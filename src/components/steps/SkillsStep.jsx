// Step 2: my skills in two blocks.
//   Hard: I work with  | List to study
//   Soft: All about me | Languages I speak
// Each block is one card; on large screens its lists sit side by side in two columns,
// and the columns of both cards line up. From w880 down everything is one column.
import cv from '../../data/cv.json';
import BulletList from '../ui/BulletList.jsx';

function SkillBlock({ title, groups }) {
    return (
        <section className="card flex flex-col gap-2">
            <h3 className="kicker">{title}</h3>

            <div className="grid grid-cols-2 gap-x-12 gap-y-5 w880:grid-cols-1">
                {groups.map((group, i) => (
                    <div key={i} className="flex flex-col gap-3">
                        {group.title && <h4 className="title title--sm">{group.title}</h4>}
                        <BulletList items={group.items} compact />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function SkillsStep() {
    const { skills } = cv;
    const [workWith, toStudy] = skills.hard.groups;

    return (
        <div className="flex flex-col gap-8 h760:gap-5">
            <h2 className="title title--md">{skills.title}</h2>

            <div className="flex flex-col gap-5">
                <SkillBlock title={skills.hard.title} groups={[workWith, toStudy]} />
                <SkillBlock
                    title={skills.soft.title}
                    groups={[
                        { title: skills.soft.listTitle, items: skills.soft.items },
                        { title: skills.languages.title, items: skills.languages.items },
                    ]}
                />
            </div>
        </div>
    );
}

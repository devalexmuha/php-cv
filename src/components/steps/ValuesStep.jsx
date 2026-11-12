// Step 9: "We are a perfect match if", "What drives me" and the P.S., three cards stacked in one column.
import cv from '../../data/cv.json';
import BulletList from '../ui/BulletList.jsx';

export default function ValuesStep() {
    const { match, drives, ps } = cv;

    return (
        <div className="flex flex-col gap-8">
            <section className="card flex flex-col gap-5">
                <h2 className="title title--md">{match.title}</h2>
                <BulletList items={match.items} />
                <div className="flex flex-col gap-2 border-t border-disabled pt-5">
                    <h3 className="title title--sm">{match.extraTitle}</h3>
                    <p className="text">{match.extra}</p>
                </div>
            </section>

            <section className="card flex flex-col gap-5">
                <h2 className="title title--md">{drives.title}</h2>
                {drives.items.map((item) => (
                    <div key={item.title} className="flex flex-col gap-2">
                        <h3 className="title title--sm">{item.title}</h3>
                        <p className="text italic">{item.quote}</p>
                        {item.list && <BulletList items={item.list} className="mt-1" />}
                    </div>
                ))}
            </section>

            <section className="card flex flex-col gap-4 border-transparent bg-footer">
                <h2 className="title title--md">{ps.title}</h2>
                <p className="text">{ps.text}</p>
            </section>
        </div>
    );
}

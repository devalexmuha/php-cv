// A list with the CV's square bullets. Each item is either a plain string,
// or { term, note }: the term is bold and the note follows it in a softer color,
//   ■ Laravel · can build api, can work with blade
// so the eye can run down the bold terms and read notes only when interested.
//
// compact = smaller text, for long lists (the Skills step) so they fit on one screen.
import RichText from './RichText.jsx';

export default function BulletList({ items, compact = false, className = '' }) {
    const itemClass = compact ? 'text-[18px] leading-[140%]' : 'text-[20px] leading-[145%] w450:text-[18px]';
    const noteClass = compact ? 'text-[16px]' : 'text-[17px] w450:text-[16px]';

    return (
        <ul className={`flex flex-col ${compact ? 'gap-2' : 'gap-2.5'} ${className}`}>
            {items.map((item, i) => (
                <li key={i} className={`bullet font-main text-body ${itemClass}`}>
                    {typeof item === 'string' ? (
                        <RichText text={item} />
                    ) : (
                        <>
                            <span className="font-semibold">{item.term}</span>
                            {item.note && <span className={`text-body/60 ${noteClass}`}> · {item.note}</span>}
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}

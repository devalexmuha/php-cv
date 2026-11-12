// Text from JSON can contain links written like Markdown: "read my [“Sol4”](https://...)".
// This turns them into real <a> tags, and leaves the rest as plain text.
const LINK = /\[([^\]]+)\]\(([^)]+)\)/;

export default function RichText({ text }) {
    // split() with a capture group keeps the links in the result:
    // "a [b](c) d" -> ["a ", "[b](c)", " d"]
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

    return parts.map((part, i) => {
        const match = part.match(LINK);
        if (!match) return part;

        const [, label, href] = match;
        return (
            <a key={i} className="link" href={href} target="_blank" rel="noopener">
                {label}
            </a>
        );
    });
}

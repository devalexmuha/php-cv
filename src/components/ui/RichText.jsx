// Text from JSON can contain two Markdown-like marks:
//   links: "read my [“Sol4”](https://...)"  -> <a>
//   code:  "from `index.php` to ..."          -> green <code>
// Everything else stays plain text.
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;
const CODE = /^`([^`]+)`$/;

export default function RichText({ text }) {
    // split() with a capture group keeps the marks in the result:
    // "a [b](c) `d` e" -> ["a ", "[b](c)", " ", "`d`", " e"]
    const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`)/g);

    return parts.map((part, i) => {
        const link = part.match(LINK);
        if (link) {
            const [, label, href] = link;
            return (
                <a key={i} className="link" href={href} target="_blank" rel="noopener">
                    {label}
                </a>
            );
        }

        const code = part.match(CODE);
        if (code) {
            // Same font as the text around it, only the theme green marks it as code
            return (
                <code key={i} className="font-[inherit] text-secondary">
                    {code[1]}
                </code>
            );
        }

        return part;
    });
}

// Build-time code (runs in Node, not in the browser).
//
// The React app builds the CV in the browser with JavaScript. Most AI tools and
// crawlers read only the raw HTML and never run JavaScript, so they would see an
// empty page. These functions turn the same JSON data into:
//   renderStaticHtml() -> the whole CV as simple HTML, written into index.html
//   renderMarkdown()   -> the whole CV as Markdown, published as cv.md
//   renderJsonLd()     -> structured "Person" data (schema.org) for the <head>
//
// It's like rendering a Blade view to a string with view(...)->render():
// plain string building, no React involved.

const SITE_URL = 'https://devalexmuha.github.io/php-cv/';

// htmlspecialchars() for JS
function esc(text) {
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// "[label](url)" links from the JSON -> <a> tags (the rest is escaped)
function richHtml(text) {
    return esc(text).replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

const stripLinks = (text) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
const item = (i) => (typeof i === 'string' ? i : i.note ? `${i.term} (${i.note})` : i.term);
const list = (items) => `<ul>${items.map((i) => `<li>${richHtml(item(i))}</li>`).join('')}</ul>`;
const mdList = (items) => items.map((i) => `- ${item(i)}`).join('\n');

export function renderStaticHtml(cv, projects) {
    const { person, hero, skills, canDo, education, experience, match, drives, ps, contacts } = cv;
    const [workWith, toStudy] = skills.hard.groups;

    return `
<article id="cv-text" class="static-cv" lang="en">
    <header>
        <p>${esc(person.name)}</p>
        <h1>${esc(hero.title)}</h1>
        <p>${esc(hero.tagline)}</p>
        <p><a href="${person.resume}" download>Download CV (PDF)</a> · <a href="cv.md">This CV as plain text (Markdown)</a></p>
    </header>

    <section>
        <h2>${esc(hero.aboutTitle)}</h2>
        <p>${richHtml(hero.about)}</p>
    </section>

    <section>
        <h2>${esc(skills.title)}</h2>
        <h3>${esc(skills.hard.title)}: ${esc(workWith.title)}</h3>
        ${list(workWith.items)}
        <h3>${esc(skills.hard.title)}: ${esc(toStudy.title)}</h3>
        ${list(toStudy.items)}
        <h3>${esc(skills.soft.title)}: ${esc(skills.soft.listTitle)}</h3>
        ${list(skills.soft.items)}
        <h3>${esc(skills.languages.title)}</h3>
        ${list(skills.languages.items)}
    </section>

    <section>
        <h2>${esc(canDo.title)}</h2>
        ${canDo.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n        ')}
    </section>

    <section>
        <h2>${esc(cv.projectsTitle)}</h2>
        ${projects
            .map(
                (project) => `
        <section>
            <h3>${richHtml(project.title)}</h3>
            <p>Tech stack: ${esc(project.stack.join(', '))}. Code: <a href="${project.github}">${project.github}</a></p>
            <p>${esc(project.description)}</p>
            <p>Screenshots, in story order (what the project can do):</p>
            <ol>${project.images.map((image) => `<li><a href="${image.src}">${esc(image.alt)}</a></li>`).join('')}</ol>
        </section>`,
            )
            .join('')}
    </section>

    <section>
        <h2>${esc(education.title)}</h2>
        ${education.items.map((e) => `<h3>${esc(e.title)}</h3><p>${e.lines.map(esc).join('<br>')}</p>`).join('')}
    </section>

    <section>
        <h2>${esc(experience.title)}</h2>
        ${experience.items.map((e) => `<h3>${esc(e.title)}</h3><p>${richHtml(e.lines.join(' · '))}</p><p>${richHtml(e.text)}</p>`).join('')}
    </section>

    <section>
        <h2>${esc(match.title)}</h2>
        ${list(match.items)}
        <h3>${esc(match.extraTitle)}</h3>
        <p>${esc(match.extra)}</p>
    </section>

    <section>
        <h2>${esc(drives.title)}</h2>
        ${drives.items.map((d) => `<h3>${esc(d.title)}</h3><p>${esc(d.quote)}</p>${d.list ? list(d.list) : ''}`).join('')}
    </section>

    <section>
        <h2>${esc(ps.title)}</h2>
        <p>${esc(ps.text)}</p>
    </section>

    <footer>
        <h2>${esc(contacts.title)}</h2>
        <ul>
            <li>Email: <a href="mailto:${contacts.email}">${esc(contacts.email)}</a></li>
            <li>Phone: <a href="tel:${contacts.phone}">${esc(contacts.phone)}</a></li>
            ${contacts.links.map((l) => `<li>${esc(l.label)}: <a href="${l.href}">${l.href}</a></li>`).join('')}
            <li>GitHub: <a href="${contacts.github.href}">${contacts.github.href}</a></li>
        </ul>
        <p>${esc(contacts.credits)}</p>
    </footer>
</article>`;
}

export function renderMarkdown(cv, projects) {
    const { person, hero, skills, canDo, education, experience, match, drives, ps, contacts } = cv;
    const [workWith, toStudy] = skills.hard.groups;

    return `# ${person.name}: ${hero.title}

${hero.tagline}

Interactive CV: ${SITE_URL}
PDF: ${SITE_URL}${person.resume}

## ${hero.aboutTitle}

${hero.about}

## ${skills.title}

### ${skills.hard.title}: ${workWith.title}

${mdList(workWith.items)}

### ${skills.hard.title}: ${toStudy.title}

${mdList(toStudy.items)}

### ${skills.soft.title}: ${skills.soft.listTitle}

${mdList(skills.soft.items)}

### ${skills.languages.title}

${mdList(skills.languages.items)}

## ${canDo.title}

${canDo.paragraphs.join('\n\n')}

## ${cv.projectsTitle}

${projects
    .map(
        (project) => `### ${project.title}

Tech stack: ${project.stack.join(', ')}. Code: ${project.github}

${project.description}

Screenshots, in story order (what the project can do):

${project.images.map((image, i) => `${i + 1}. ${image.alt}`).join('\n')}`,
    )
    .join('\n\n')}

## ${education.title}

${education.items.map((e) => `### ${e.title}\n\n${e.lines.join('  \n')}`).join('\n\n')}

## ${experience.title}

${experience.items.map((e) => `### ${e.title}\n\n${e.lines.join(' · ')}\n\n${e.text}`).join('\n\n')}

## ${match.title}

${mdList(match.items)}

### ${match.extraTitle}

${match.extra}

## ${drives.title}

${drives.items.map((d) => `### ${d.title}\n\n${d.quote}${d.list ? `\n\n${mdList(d.list)}` : ''}`).join('\n\n')}

## ${ps.title}

${ps.text}

## ${contacts.title}

- Email: ${contacts.email}
- Phone: ${contacts.phone}
${contacts.links.map((l) => `- ${l.label}: ${l.href}`).join('\n')}
- GitHub: ${contacts.github.href}
`;
}

export function renderJsonLd(cv) {
    const { person, hero, skills, education, experience, contacts } = cv;
    const terms = skills.hard.groups[0].items.map((i) => i.term);

    const data = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: person.name,
        jobTitle: hero.title,
        description: `${hero.tagline} ${stripLinks(hero.about)}`,
        url: SITE_URL,
        image: SITE_URL + person.photo,
        email: `mailto:${contacts.email}`,
        telephone: contacts.phone,
        sameAs: [...contacts.links.map((l) => l.href), contacts.github.href],
        knowsAbout: terms,
        knowsLanguage: skills.languages.items.map((i) => i.term),
        alumniOf: education.items.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.title })),
        hasOccupation: experience.items.map((e) => ({ '@type': 'Occupation', name: e.title, description: stripLinks(e.text) })),
    };

    // "</" is escaped so the JSON can never close the <script> tag early
    return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

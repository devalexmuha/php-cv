// Step 10, the bottom of the dive: contact details, Download CV and my GitHub.
import cv from '../../data/cv.json';
import { asset } from '../../lib/asset.js';
import Icon from '../ui/Icon.jsx';

function ContactRow({ href, icon, children, external = false }) {
    return (
        <li>
            <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener' } : {})}
                className="flex items-center gap-4 font-title text-[20px] text-secondary transition-colors hover:text-body w450:text-[17px]"
            >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white">{icon}</span>
                <span className="break-all">{children}</span>
            </a>
        </li>
    );
}

export default function ContactsStep() {
    const { contacts, person } = cv;

    return (
        <div className="relative flex flex-col gap-10 overflow-hidden rounded-3xl bg-footer p-12 w880:gap-8 w880:p-6">
            <img
                src={asset(person.signature)}
                alt=""
                className="pointer-events-none absolute -top-2 right-10 w-[260px] opacity-60 w880:hidden"
            />

            <h2 className="title title--md uppercase">{contacts.title}</h2>

            <div className="grid grid-cols-[1fr_auto] items-end gap-10 w880:grid-cols-1">
                <ul className="flex flex-col gap-4">
                    <ContactRow href={`mailto:${contacts.email}`} icon={<Icon name="mail" />}>
                        {contacts.email}
                    </ContactRow>
                    <ContactRow href={`tel:${contacts.phone}`} icon={<Icon name="phone" />}>
                        {contacts.phone}
                    </ContactRow>
                    {contacts.links.map((link) => (
                        <ContactRow key={link.label} href={link.href} external icon={<img src={asset(link.icon)} alt="" className="size-6" />}>
                            {link.label}
                        </ContactRow>
                    ))}
                </ul>

                <div className="flex flex-col gap-3 w880:flex-row w880:flex-wrap">
                    <a href={asset(person.resume)} download className="btn btn--primary h-13 px-7 text-[17px]">
                        <Icon name="download" />
                        Download CV
                    </a>
                    <a href={contacts.github.href} target="_blank" rel="noopener" className="btn btn--outline h-13 px-7 text-[17px]">
                        <Icon name="github" />
                        {contacts.github.label}
                        <Icon name="arrow-up-right" className="size-4" />
                    </a>
                </div>
            </div>

            <p className="border-t-2 border-secondary pt-3 text">{contacts.credits}</p>
        </div>
    );
}

// Step 10, the bottom of the dive: contact details, Download CV and my GitHub.
// Three columns on large screens: email + phone | LinkedIn + Telegram | buttons.
// The signature sits in the background, behind everything else.
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
    const [linkedIn, telegram] = contacts.links;
    const linkIcon = (link) => <img src={asset(link.icon)} alt="" className="size-6" />;

    return (
        // `isolate` starts a new layer stack, so the signature's -z-10 stays inside this panel.
        // `my-auto` keeps the panel centered between the top and bottom bars on every screen
        // (StepScreen aligns steps to the top from w880 down; auto margins override that here).
        <div className="relative isolate my-auto flex flex-col gap-10 overflow-hidden rounded-3xl bg-footer p-12 w880:gap-8 w880:p-6">
            <img
                src={asset(person.signature)}
                alt=""
                // Desktop: in the empty space between the 2nd and 3rd columns.
                // From w1100 down the columns change, so it goes back to the center;
                // on phones (w580) it's 16px higher so it doesn't sit on the Telegram label.
                className="pointer-events-none absolute top-1/2 left-[62%] -z-10 w-[320px] max-w-[80%] -translate-x-1/2 -translate-y-1/2 opacity-60 w1100:left-1/2 w1100:w-[420px] w580:top-[calc(50%-16px)]"
            />

            <h2 className="title title--md uppercase">{contacts.title}</h2>

            <div className="grid grid-cols-3 items-start gap-10 w1100:grid-cols-2 w580:grid-cols-1 w580:gap-4">
                <ul className="flex flex-col gap-4">
                    <ContactRow href={`mailto:${contacts.email}`} icon={<Icon name="mail" />}>
                        {contacts.email}
                    </ContactRow>
                    <ContactRow href={`tel:${contacts.phone}`} icon={<Icon name="phone" />}>
                        {contacts.phone}
                    </ContactRow>
                </ul>

                <ul className="flex flex-col gap-4">
                    <ContactRow href={linkedIn.href} external icon={linkIcon(linkedIn)}>
                        {linkedIn.label}
                    </ContactRow>
                    <ContactRow href={telegram.href} external icon={linkIcon(telegram)}>
                        {telegram.label}
                    </ContactRow>
                </ul>

                {/* justify-self-end: the column sits on the right and is as wide as the widest button,
                    and the buttons stretch to that width, so both are the same size */}
                <div className="flex flex-col gap-3 justify-self-end w1100:col-span-2 w1100:flex-row w1100:flex-wrap w1100:justify-self-start w580:col-span-1 w580:mt-4 w580:flex-col">
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

            <p className="border-t-2 border-secondary pt-3 text-center text">{contacts.credits}</p>
        </div>
    );
}

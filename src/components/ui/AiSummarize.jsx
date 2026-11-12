// "Summarize this CV with AI": one round icon link per AI service.
// Each link opens the service with the prompt already typed in (?q=...).
// Gemini has no such link, so for Gemini we copy the prompt and the visitor pastes it.
import { useState } from 'react';
import cv from '../../data/cv.json';
import { ChatGptIcon, GeminiIcon, ClaudeIcon, PerplexityIcon, GrokIcon } from './AiIcons.jsx';

const prompt = encodeURIComponent(cv.aiSummarize.prompt);

const services = [
    { name: 'ChatGPT', href: `https://chatgpt.com/?q=${prompt}`, Icon: ChatGptIcon },
    { name: 'Gemini', href: 'https://gemini.google.com/app', Icon: GeminiIcon, copyPrompt: true },
    { name: 'Claude', href: `https://claude.ai/new?q=${prompt}`, Icon: ClaudeIcon },
    { name: 'Perplexity', href: `https://www.perplexity.ai/search?q=${prompt}`, Icon: PerplexityIcon },
    { name: 'Grok', href: `https://grok.com/?q=${prompt}`, Icon: GrokIcon },
];

export default function AiSummarize() {
    const [copied, setCopied] = useState(false);

    function copyPrompt() {
        navigator.clipboard
            ?.writeText(cv.aiSummarize.prompt)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 4000);
            })
            .catch(() => {});
    }

    return (
        <div className="relative flex flex-wrap items-center gap-x-5 gap-y-2.5">
            <p className="text">{cv.aiSummarize.label}</p>
            <ul className="flex items-center gap-2.5">
                {services.map(({ name, href, Icon, copyPrompt: shouldCopy }) => (
                    <li key={name}>
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener"
                            onClick={shouldCopy ? copyPrompt : undefined}
                            title={shouldCopy ? `Summarize with ${name} (prompt copied, just paste)` : `Summarize with ${name}`}
                            aria-label={`Summarize with ${name}`}
                            className="flex size-11 items-center justify-center rounded-full border border-disabled bg-white text-body transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-body"
                        >
                            <Icon />
                        </a>
                    </li>
                ))}
            </ul>
            {/* Always in the DOM (screen readers announce changes), positioned so it takes no space */}
            <p role="status" className="absolute top-full left-0 mt-1 font-title text-[13px] text-secondary">

                {copied ? 'Prompt copied. Paste it into Gemini.' : ''}
            </p>
        </div>
    );
}

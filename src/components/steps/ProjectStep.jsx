// Steps 4-7: one pet project per screen. The same component is used for every project;
// steps.js passes a different `project`.
//
// Layout with CSS grid areas:
//   desktop:  head    | gallery        mobile:  head
//             body    | gallery                 gallery   <- screenshots come early on phones
//                                               body
import cv from '../../data/cv.json';
import RichText from '../ui/RichText.jsx';
import ProjectGallery from '../ui/ProjectGallery.jsx';
import Icon from '../ui/Icon.jsx';

export default function ProjectStep({ project, number, total }) {
    return (
        <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-x-14 gap-y-5 [grid-template-areas:'head_gallery'_'body_gallery'] w1100:gap-x-8 w880:grid-cols-1 w880:gap-y-6 w880:[grid-template-areas:'head'_'gallery'_'body']">
            <div className="flex flex-col gap-4 self-end [grid-area:head]">
                <p className="kicker">
                    {cv.projectsTitle} · {number} / {total}
                </p>
                <h2 className="title title--md">
                    <RichText text={project.title} />
                </h2>
                <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                    {project.stack.map((tech) => (
                        <li key={tech} className="chip">
                            {tech}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="self-center [grid-area:gallery]">
                <ProjectGallery project={project} />
            </div>

            <div className="flex flex-col gap-8 self-start [grid-area:body] h760:gap-5">
                <p className="text">
                    <RichText text={project.description} />
                </p>
                <a href={project.github} target="_blank" rel="noopener" className="btn btn--outline self-start">
                    <Icon name="github" />
                    Code on GitHub
                    <Icon name="arrow-up-right" className="size-4" />
                </a>
            </div>
        </div>
    );
}

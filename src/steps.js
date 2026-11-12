// The CV is split into steps (screens). This file is the "routes file":
// the order here is the order the visitor goes through, deeper and deeper.
//
//   id       -> shown in the URL: .../php-cv/#/skills
//   chapter  -> group name in the table of contents
//   label    -> short name for the step (used on the "Next" button)
//   Component + props -> what to render (like a controller returning a view)
import projects from './data/projects.json';
import HeroStep from './components/steps/HeroStep.jsx';
import SkillsStep from './components/steps/SkillsStep.jsx';
import CanDoStep from './components/steps/CanDoStep.jsx';
import ProjectStep from './components/steps/ProjectStep.jsx';
import BackgroundStep from './components/steps/BackgroundStep.jsx';
import ValuesStep from './components/steps/ValuesStep.jsx';
import ContactsStep from './components/steps/ContactsStep.jsx';

export const steps = [
    { id: 'hello', chapter: 'Welcome', label: 'Welcome', Component: HeroStep },
    { id: 'skills', chapter: 'My skills', label: 'My skills', Component: SkillsStep },
    { id: 'what-i-can-do', chapter: 'What I can do', label: 'What I can do', Component: CanDoStep },

    // One step per pet project, generated from src/data/projects.json
    ...projects.map((project, i) => ({
        id: project.id,
        chapter: 'Pet projects',
        label: project.name,
        Component: ProjectStep,
        props: { project, number: i + 1, total: projects.length },
    })),

    { id: 'education-and-experience', chapter: 'Education & experience', label: 'Education & experience', Component: BackgroundStep },
    { id: 'why-me', chapter: 'Why me', label: 'Why me', Component: ValuesStep },
    { id: 'contacts', chapter: 'Contacts', label: 'Contacts', Component: ContactsStep },
];

// Chapters for the table of contents: [{ name: 'Skills', firstIndex: 1 }, ...]
export const chapters = steps.reduce((list, step, index) => {
    if (!list.some((chapter) => chapter.name === step.chapter)) {
        list.push({ name: step.chapter, firstIndex: index });
    }
    return list;
}, []);

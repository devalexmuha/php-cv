// Entry point (like public/index.php in Laravel): index.html loads this file,
// and it renders the <App /> component into <div id="root">.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './main.css';

// The plain-text copy of the CV (for AI tools, see prerender/static-cv.js) is already
// hidden visually. `inert` also hides it from screen readers and the Tab key,
// so people using the app don't get the CV twice.
document.getElementById('cv-text')?.setAttribute('inert', '');

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);

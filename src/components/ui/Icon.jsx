// Small line icons used across the site. Each one is a tiny component:
//   <Icon name="chevron-right" />
// Line icons share one <svg> wrapper; the GitHub mark is a filled logo.
const paths = {
    'chevron-left': <path d="M15 18l-6-6 6-6" />,
    'chevron-right': <path d="M9 18l6-6-6-6" />,
    'arrow-up-right': <path d="M7 17L17 7M8 7h9v9" />,
    'arrow-down': <path d="M12 5v14M6 13l6 6 6-6" />,
    home: <path d="M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10" />,
    download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
    menu: <path d="M4 7h16M4 12h16M4 17h10" />,
    close: <path d="M6 6l12 12M18 6L6 18" />,
    mail: <path d="M3 6h18v12H3zM3 7l9 6 9-6" />,
    phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
    images: <path d="M3 5h14v11H3zM7 20h14V9M3 13l4-4 4 4 2-2 4 4" />,
};

export default function Icon({ name, className = 'size-5' }) {
    if (name === 'github') {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
                <path d="M12 0c6.63 0 12 5.276 12 11.79-.001 5.067-3.29 9.567-8.175 11.187-.6.118-.825-.25-.825-.56 0-.398.015-1.665.015-3.242 0-1.105-.375-1.813-.81-2.181 2.67-.295 5.475-1.297 5.475-5.822 0-1.297-.465-2.344-1.23-3.169.12-.295.54-1.503-.12-3.125 0 0-1.005-.324-3.3 1.209a11.32 11.32 0 00-3-.398c-1.02 0-2.04.133-3 .398-2.295-1.518-3.3-1.209-3.3-1.209-.66 1.622-.24 2.83-.12 3.125-.765.825-1.23 1.887-1.23 3.169 0 4.51 2.79 5.527 5.46 5.822-.345.294-.66.81-.765 1.577-.69.31-2.415.81-3.495-.973-.225-.354-.9-1.223-1.845-1.209-1.005.015-.405.56.015.781.51.28 1.095 1.327 1.23 1.666.24.663 1.02 1.93 4.035 1.385 0 .988.015 1.916.015 2.196 0 .31-.225.664-.825.56C3.303 21.374-.003 16.867 0 11.791 0 5.276 5.37 0 12 0z" />
            </svg>
        );
    }

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {paths[name]}
        </svg>
    );
}

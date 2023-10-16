import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// Echo.private(`messanger`)
//     .listen('ChatMessage', (e) => {
//         console.log(e);
//         console.log(e.message);
//     });

Echo.private(`chat`)
    .listen('MessageSent', (e) => {
        alert('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        console.log(e.message);

        this.messages.push({
            message: e.message.message,
            user: e.user
        });
    });

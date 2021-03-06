import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './app';


const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    if (onNavigate) {
        history.listen(onNavigate); // Listen route changed from container
    }

    ReactDOM.render(<App history={history} />, el);

    return {
        onParentNavigate: ({ pathname: nextPathname }) => {
            const { pathname } = history.location;

            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing--dev-root');
    if (devRoot) {
        // defaultHistory: Make change url when route for marketing app in dev mode
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

export {
    mount
}
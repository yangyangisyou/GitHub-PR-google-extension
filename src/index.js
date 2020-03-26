import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self' blob: filesystem:". Either the 'unsafe-inline' keyword, a hash ('sha256-layzCFr9NNf8nS4NNtSE6FAKjTYGQjPlKWfcwyIL38o='), or a nonce ('nonce-...') is required to enable inline execution.
const app = (<App />);
ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();

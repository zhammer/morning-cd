import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: 'https://2e20f00fde4a48c7bf36cd7cabac511c@sentry.io/1362113' });
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
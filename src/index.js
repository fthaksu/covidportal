import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { IntlProvider } from "react-intl";
import messages from './i18n/messages.json';

const language = navigator.language.split(/[-_]/)[0];  // language without region code
const navLang =  (language === 'tr') ? language : 'en' ; 

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={navLang} messages={messages[navLang]}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

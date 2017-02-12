import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppState from './stores/AppState';
import App from './App';
import {Provider} from 'mobx-react';


import style from './scss/style.scss';


const appState = new AppState();


// for debugging
window.appState = appState;

render(
  <AppContainer>
    <Provider appState={appState}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <NextApp appState={appState} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import './styles/App.css';

import Home from './components/home'

function App({ store }) {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Home />
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
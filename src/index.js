import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import 'antd/dist/antd.css';
import { ProvideAuth } from './hooks/auth';
import reportWebVitals from './reportWebVitals';
import Routes from './routes';
import GlobalStyles from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    <>
      <ProvideAuth>
        <Router>
          <Routes />
        </Router>
      </ProvideAuth>
      <GlobalStyles />
    </>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();

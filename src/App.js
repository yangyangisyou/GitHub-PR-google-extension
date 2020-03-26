import React from 'react';
import './App.css';
import Home from './home';
import 'antd/dist/antd.css';
import {
  Router,
  Link,
  goBack,
  goTo,
  popToTop
} from 'react-chrome-extension-router';
function App() {
  return (
    <div className="App">
        <Router>
          <Home />
        </Router>
    </div>
  );
}

export default App;

import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import './utils/tokenMiddleware';

import store from './store'
import Siteheader from './components/Siteheader'
import Sitefooter from './components/Sitefooter'
import Login from './components/page/login'
import PMS from './components/page/pms'
import OMS from './components/page/oms'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <div className="container-fluid">
            <div className="top_header_section">
              <Siteheader />
            </div>
              <article style={{ maxWidth: '1440px', margin: '0 auto', width: '100%'}}>
                <Route exact  path="/admin/" component={Login}/>
                <Route exact  path="/admin/login" component={Login}/>
                <Route exact  path="/admin/pms" component={PMS}/>
                <Route exact  path="/admin/oms" component={OMS}/>
                {/* <Route exact  path="/admin/logout" component={Login}/> */}
              </article>
            <Sitefooter />
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

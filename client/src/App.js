import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import store from './store'
import Siteheader from './components/layout/Siteheader'
import Searchbar from './components/Searchbar'
import Menubar from './components/Menubar'
import Sitefooter from './components/layout/Sitefooter'
import './utils/axios.js';

import Homepage from './components/layout/pages/Homepage'
import Catpage from './components/layout/pages/Categorypage'
import Searchpage from './components/layout/pages/Searchpage'
import AlertBar from './components/Alertbar'
import Cartpage from './components/layout/pages/Cartpage'
import Checkoutpage from './components/layout/pages/Checkoutpage'
import Review from './components/layout/pages/Reviewpage'
import OrderConfirmation from './components/layout/pages/OrderConfirmationpage'
import OrderTracking from './components/layout/pages/OrderTrackingpage' 

class App extends Component {
  
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <div className="container-fluid">
              <div className="top_header_section">
                <Siteheader />
                <Searchbar />
                <Menubar />
              </div>
              <AlertBar/>
              <article style={{ maxWidth: '1440px', margin: '0 auto', width: '100%',position: 'relative' }}>
                <Route exact  path="/" component={Homepage} />
                {/* <Route exact  path="/d/:department" component={Deptpage} /> */}
                <Route exact  path="/c/:category" component={Catpage} />
                <Route exact  path="/s/:searchterm" component={Searchpage} />                
                <Route exact  path="/cart" component={Cartpage} />
                <Route exact  path="/checkout" component={Checkoutpage}/>
                <Route exact  path="/review" component={Review}/>
                <Route exact  path="/oc" component={OrderConfirmation}/>
                <Route exact  path="/ot" component={OrderTracking}/>
              </article>
              <Sitefooter />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

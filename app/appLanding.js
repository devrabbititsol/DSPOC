/* Importing the node modules, child components, services and controllers used */
//import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Import routing components
import { browserHistory } from 'react-router';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';


import routes from './routes';

const webpage = (
    <div>
        {routes}
    </div>);

{/*const webpage = (
    <div>
      <div>
        <Header/>
          {routes}
       <Footer />

       </div>
</div>);*/}


ReactDOM.render(webpage, document.getElementById('root')
);

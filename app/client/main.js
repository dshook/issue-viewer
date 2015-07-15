import React from 'react';
import layout from './views/Layout.jsx';
import babel from 'babel/polyfill';

var Layout = React.createFactory(layout);
React.render(
  new Layout()
  , document.getElementById('layout')
);

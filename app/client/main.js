import React from 'react';
import layout from './views/Layout.jsx';

var Layout = React.createFactory(layout);
React.render(
  new Layout()
  , document.getElementById('layout')
);

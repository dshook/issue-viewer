import React from 'react';
import layout from './views/layout.jsx';

var Layout = React.createFactory(layout);
React.render(
  new Layout()
  , document.getElementById('layout')
);

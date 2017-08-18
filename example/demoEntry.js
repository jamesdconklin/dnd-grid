import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';

import Demo from 'Demo';

document.addEventListener("DOMContentLoaded",
  () => {
    var demo = document.getElementById("demo");
    ReactDom.render(<Demo/>, demo);
  }
);

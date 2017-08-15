import React from 'react';
import ReactDom from 'react-dom';

import * as foobar from 'dndGrid';
import DndGrid from '../dist/dndGrid';

document.addEventListener("DOMContentLoaded",
  () => {
    var demo = document.getElementById("demo");
    ReactDom.render(<DndGrid height={500} width={500} />, demo);
  }
);

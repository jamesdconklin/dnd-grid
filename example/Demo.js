import React, { PureComponent } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Circle from './Circle';

import DndGrid from '../dist/dndGrid';


class Demo extends PureComponent {
  render() {
    return (
      <DndGrid width={300} height={300} interval={20}>
        <Circle radius={40} color="red" key="red"/>
        <Circle radius={60} color="blue" key="blue" />
      </DndGrid>
    );
  }
}

export default DragDropContext(HTML5Backend)(Demo);

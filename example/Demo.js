import React, { PureComponent } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Circle from './Circle';
import Triangle from './Triangle';

import DndGrid from '../dist/dndGrid';


class Demo extends PureComponent {
  render() {
    return (
      <DndGrid snap>
        <Circle radius={40} color="red" key="red"/>
        <Triangle width={60} color="blue" key="blue" />
        <span
          style={{
            color: "white",
            backgroundColor: "green",
          }}
          key="effbeezed">
            FOO BAR BAZ
        </span>
      </DndGrid>
    );
  }
}

export default DragDropContext(HTML5Backend)(Demo);

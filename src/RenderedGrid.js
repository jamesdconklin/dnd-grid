/*
  Renders a grid defined by provided width, height, interval, color,
  and lineWidth props.

  Should render in front of the dropGrid and the draggableWrapper items,
  but should be inert vis-a-vis any interactions.
*/

import React, { PureComponent } from 'react';

const DEFAULT_STYLE = {
  width: '100%',
  height: '100%',
  lineWidth: 1,
  interval: 40,
  color: 'rgba(0,0,0,1)',
};

class RenderedGrid extends PureComponent {
  toStyle() {
    const style = {};

    //Validate Numeric Props
    ['height', 'width', 'lineWidth', 'interval'].forEach(
      (parameter) => {
        const value = this.props[parameter];
        if (value !== undefined) {
          const numeric = Number(value);
          if (!isNaN(numeric)) {
            style[parameter] = numeric;
          } else {
            throw new TypeError(
              `Non-numeric value given for ${parameter} prop.`
            );
          }
        }
      }
    );

    //Validate Color Prop
    if (this.props.color) {
      const dummy = document.createElement('div');
      dummy.style.color = this.props.color;
      if (dummy.style.color) {
        //Then the color was accepted.
        style.color = this.props.color;
      } else {
        throw new TypeError('Invalid color prop given.');
      }
    }

    const mergedStyle = Object.assign({}, DEFAULT_STYLE, style);

    const gradientDefinition =
      `linear-gradient(to right, ${mergedStyle.color} ` +
      `${mergedStyle.lineWidth}px, transparent ${mergedStyle.lineWidth}px),` +
      `linear-gradient(to bottom, ${mergedStyle.color} ` +
      `${mergedStyle.lineWidth}px, transparent ${mergedStyle.lineWidth}px)`;

    return {
      backgroundImage: gradientDefinition,
      backgroundSize: `${mergedStyle.interval}px ${mergedStyle.interval}px`,
      overflow: 'hidden',
      width: mergedStyle.width,
      height: mergedStyle.height,
      position: 'absolute',
    };
  }

  render() {
    const gridStyle = this.toStyle();

    return (
      <div style={gridStyle}/>
    );
  }
}
export default RenderedGrid;

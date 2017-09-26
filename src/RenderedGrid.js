/*
  Renders a cofigurable grid.

  Props:
    width, height: Self-explanatory
    lineWidth: width in pixels of the grid lines.
    color: Stroke color of the grid lines
    interval: width/height of columns/rows.
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_STYLE = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
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

    const { color, interval, lineWidth } = this.props;

    //Validate Color Prop
    if (this.props.color) {
      const dummy = document.createElement('div');
      dummy.style.color = this.props.color;
      if (!dummy.style.color) {
        //Then the color was rekected.
        throw new TypeError('Invalid color prop given.');
      }
    }

    // Validate and set up gradient.

    if (Number.isInteger(interval) && Number.isInteger(lineWidth)) {
      style.backgroundImage =
        `linear-gradient(to right, ${color} ${lineWidth}px, ` +
        `transparent ${lineWidth}px), ` +
        `linear-gradient(to bottom, ${color} ${lineWidth}px, ` +
        `transparent ${lineWidth}px)`;

      style.backgroundSize = `${interval}px ${interval}px`;
    } else {
      throw new TypeError('Invalid lineWidth or interval prop given.');
    }

    return Object.assign({}, DEFAULT_STYLE, style);
  }

  render() {
    const gridStyle = this.toStyle();

    return (
      <div style={gridStyle}/>
    );
  }
}

RenderedGrid.propTypes = {
  color: PropTypes.string.isRequired,
  lineWidth: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired,
};

RenderedGrid.defaultProps = {
  color: 'rgba(0,0,0,1)',
  lineWidth: 1,
  interval: 50,
};

export default RenderedGrid;

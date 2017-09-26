/*
  Top-Level component for the dnd-grid component. Takes components as
  children and places and moves them within a props-defined grid.

  Props:
    lineWidth, interval, color, width, height: See RenderedGrid.
    showGrid: include RendereGrid if true.
    snap: Snaps child components to nearest grid lines at component's
      left and top edges.

*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import update from 'react-addons-update';

import ItemTypes from 'ItemTypes';
import Draggable from 'Draggable';
import snapToGrid from 'snapToGrid';
import GridDragLayer from 'GridDragLayer';
import RenderedGrid from 'RenderedGrid';

const baseStyles = {
  position: 'relative',
  border: '1px solid red',
  overflow: 'hidden',
};

const draggableTarget = {
  drop(props, monitor, component) {

    const delta = monitor.getDifferenceFromInitialOffset();
    const item = monitor.getItem();

    let left = Math.round(item.left + delta.x);
    let top = Math.round(item.top + delta.y);

    //This clalback is not automagically grabbing the default props.
    const mergedProps = Object.assign({}, Grid.defaultProps, props);

    if (mergedProps.snap) {
      [left, top] = snapToGrid(left, top, mergedProps);
    }

    component.moveBox(item.id, left, top);
  }
};

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    const items = React.Children.map(props.children, child => (
      { top: 0, left: 0, id: child.key, child }
    ));

    this.state = { items };
  }

  getIndexById(id) {
    return this.state.items.findIndex(x => id === x.id);
  }

  moveBox(id, left, top) {
    const index = this.getIndexById(id);
    const items = this.state.items;
    const newItem = Object.assign({}, items[index], { left, top });
    let nextState;

    // Check if we need to re-order.
    if (index === items.length - 1) {
      nextState = update(
        this.state,
        {
          items: {
            [index] : {
              left: { $set: left },
              top: { $set: top },
            }
          }
        }
      );
    } else {
      nextState = update(
        this.state,
        {
          items: {
            $set: items.slice(0, index).concat(items.slice(index+1), newItem),
          }
        }
      );
    }

    this.setState(nextState);
  }

  renderItem(item) {
    const { child, left, top, id } = item;
    return (
      <Draggable key={id} id={id} left={left} top={top}>
        {child}
      </Draggable>
    );
  }

  render() {
    const {
      connectDropTarget, height, width, snap, interval, lineWidth, color,
      showGrid
    } = this.props;

    const gridProps = { interval, color, lineWidth, snap, width, height };

    const { items } = this.state;

    const style = Object.assign({}, baseStyles, { width, height });
    return connectDropTarget(
      <div style={style}>
        {showGrid && (<RenderedGrid {...gridProps} />)}
        <div>
          {
            items.map(item => this.renderItem(item))
          }
        </div>
        <GridDragLayer {...gridProps} />
      </div>
    );
  }
}

Grid.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  snap: PropTypes.bool,
  showGrid: PropTypes.bool,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired,
  lineWidth: PropTypes.number,
  color: PropTypes.string,
  children: PropTypes.node,
};

Grid.defaultProps = {
  showGrid: true,
  snap: false,
  width: 500,
  height: 500,
  interval: 50,
  lineWidth: 1,
  color: "black",
};

export default DropTarget(
  ItemTypes.Draggable,
  draggableTarget,
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(Grid);

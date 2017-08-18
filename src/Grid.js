import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from 'ItemTypes';
import Draggable from 'Draggable';
import snapToGrid from 'snapToGrid';
import GridDragLayer from 'GridDragLayer';

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

    if (props.snapToGrid) {
      [left, top] = snapToGrid;
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

    // Shallow copy.
    const newItem = Object.assign({}, this.state.items[index], { left, top });
    const items = [];

    // Copy over items, ignoring the moved item and appending it last.
    this.state.items.forEach(item => {
      if (item.id !== newItem.id) {
        items.push(item);
      }
    });
    items.push(newItem);

    this.setState({ items });
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
    const { connectDropTarget, height, width } = this.props;
    const { items } = this.state;

    const style = Object.assign({}, baseStyles, { width, height });
    return connectDropTarget(
      <div style={style}>
        <div>
          {
            items.map(item => this.renderItem(item))
          }
        </div>
        <GridDragLayer snapToGrid={false} />
      </div>
    );
  }
}

Grid.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  // snapToGrid: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired,
  // gridOnTop: PropTypes.bool.isRequired,
  // lineWidth: PropTypes.number.isRequired,
  // gridColor: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default DropTarget(
  ItemTypes.Draggable,
  draggableTarget,
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(Grid);

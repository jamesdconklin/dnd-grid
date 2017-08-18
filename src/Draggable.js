import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ItemTypes from 'ItemTypes';

const draggableSource = {
  beginDrag(props) {
    const { id, left, top, children } = props;
    return { id, left, top, children };
  },
};

function getStyles(props) {
  const { left, top, isDragging } = props;

  return {
    position: 'absolute',
    left,
    top,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  };
}

class Draggable extends PureComponent {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  render() {
    const { children, connectDragSource } = this.props;

    return connectDragSource(
      <div style={getStyles(this.props)}>
        {children}
      </div>
    );
  }
}

Draggable.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
};

export default DragSource(
  ItemTypes.Draggable,
  draggableSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })
)(Draggable);

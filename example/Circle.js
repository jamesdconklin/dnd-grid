import React from 'react';
import update from 'react/lib/update';

window.update = update;

function getStyle(props) {
  const { radius, color } = props;

  return {
    width: 0,
    height: 0,
    borderRadius: radius,
    border: `${radius}px solid ${color || 'black'}`,
  };
}

export default function Square(props) {
  return (<div style={getStyle(props)} />);
}

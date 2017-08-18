import React from 'react';

function getStyle(props) {
  const { width, color } = props;

  return {
    width: 0,
    height: 0,
    borderLeft: `${width / 2}px solid transparent`,
    borderRight: `${width / 2}px solid transparent`,
    borderBottom: `${width / 2}px solid ${color || 'black'}`,
  };
}

export default function Triangle(props) {
  return (<div style={getStyle(props)} />);
}

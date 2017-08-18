import React from 'react';

function getStyle(props) {
  const { size, color } = props;

  return {
    width: size,
    height: size,
    content: '',
    backgroundColor: color || "black"
  };
}

export default function Square(props) {
  return (<div style={getStyle(props)} />);
}

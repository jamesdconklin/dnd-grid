# dnd-grid

A react component for moving components around a configurable grid.

## Acknowledgement
This component is derived from the Custom Drag Layer example in
the react-dnd documentation. The main differences are expanding the Draggable
component to support arbitrary child components, reordering children so
that the last-dragged item is rendered on top, and rendering a configurable grid.

## Features
 - Aggregation of arbitrary child components.
 - Positional manipulation of contained components.
 - Configurable grid dimensions and display.
 - Layer management - last moved is on top.

## Usage
Source transpiles to `src/dndGrid.js`.

Wrap components you wish to have as draggable elements on the grid as children of the `DndGrid` component. The initial order of components determines the initial ordering, with later children on top as normal.

Configure the grid with the following props:

 - `width`: Set the width of the grid in pixels. Default 500.
 - `height`: Set the height of the grid in pixels. Default 500.
 - `interval`: Set the size of the grid's columns and rows in pixels. Default 50.
 - `lineWidth`: Set the width in pixels of the grid lines. Default 1.
 - `color`: Sets the grid line color with a css-appropriate string. Default 'black'.
 - `snap`: Turn on or off snapping components to the grid. Default false.
 - `showGrid`: Turn on or off grid rendering. Default true/on.

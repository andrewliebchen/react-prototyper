import React from 'react';

const Canvas = (props) =>
  <div className="Canvas">
    {props.component && React.createElement(
      props.component.type,
      props.component.props,
      props.component.props.children
    )}
  </div>

export default Canvas;

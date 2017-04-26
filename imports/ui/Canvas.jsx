import React from 'react';
import PropTypes from 'prop-types';

const Canvas = (props) =>
  <div className="Canvas">
    {props.components.length > 0 && props.components.map((component) =>
      <span key={component._id}>
        {eval(component.reactComponent)}
      </span>
    )}
  </div>

Canvas.propTypes = {
  components: PropTypes.array.isRequired,
};

export default Canvas;

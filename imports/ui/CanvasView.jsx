import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Canvas from './Canvas';

import { Components } from '../api/components';
import { States } from '../api/states';
import { Projects } from '../api/projects';

export default createContainer(({ match }) => {
  const project = match.params._id;
  return {
    components: Components.find({project: project}).fetch(),
    state: States.findOne({project: project}),
    noTransition: true,
    preview: true,
    scale: 1,
  };
}, Canvas);

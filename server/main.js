import { Meteor } from 'meteor/meteor';
import { transform } from 'babel-core';
import React from 'react';

import { Projects } from '../imports/api/projects';
import { Components } from '../imports/api/components';
import { States } from '../imports/api/states';

// TODO: For state, just use JSON.stringify to get the userValue, or use a GUI

Meteor.startup(() => {
  if (Projects.find().count() === 0) {
    const bootstrapProject = Meteor.call('newProject', {
      createdAt: Date.now(),
    });
    Meteor.call('componentBootstrap', bootstrapProject);
    Meteor.call('stateBootstrap', bootstrapProject);

    console.log(bootstrapProject);
  }

});

Meteor.methods({
  stateBootstrap(project) {
    States.insert({
      userCode: '"modal": false',
      transformedCode: { "modal": false },
      createdAt: Date.now(),
      project: project,
    });
  },

  componentBootstrap(project) {
    Components.insert({
      userCode: '<div>Hello world!</div>',
      transformedCode: "React.createElement('div', null, 'Hello world!')",
      createdAt: Date.now(),
      project: project,
    });
  },

  newProject(args) {
    return Projects.insert({
      createdAt: args.createdAt,
    });
  },

  newComponent(args) {
    return Components.insert({
      createdAt: args.createdAt,
      project: args.project,
    });
  },

  setState(args) {
    let newState = JSON.parse(`{${args.userCode}}`);
    update = States.update(args.id, {
      $set: {
        userCode: args.userCode,
        transformedCode: newState,
        updatedAt: args.updatedAt,
      }
    });
  },

  updateElement(args) {
    let update;

    switch (args.type) {
      case 'component':
        let reactComponent = transform(args.userCode, {"presets": ["react"]}).code;
        update = Components.update(args.id, {
          $set: {
            userCode: args.userCode,
            transformedCode: reactComponent,
            updatedAt: args.updatedAt,
          }
        });
        break;
      case 'state':
        Meteor.call('setState', args);
        break;
    };

    return update;
  },

  deleteComponent(id) {
    Components.remove(id);
  },
});

import { Meteor } from 'meteor/meteor';
import { transform } from 'babel-core';
import React from 'react';

import { Components } from '../imports/api/components';
import { States } from '../imports/api/states';
import { Events } from '../imports/api/events';

// TODO: For state, just use JSON.stringify to get the userValue, or use a GUI

Meteor.startup(() => {
  if (Components.find().count() === 0) {
    Meteor.call('componentBootstrap');
  }
  if (States.find().count() === 0) {
    Meteor.call('stateBootstrap');
  }
});

Meteor.methods({
  stateBootstrap() {
    States.insert({
      userCode: '"modal": false',
      transformedCode: { "modal": false },
      createdAt: Date.now(),
    });
  },

  componentBootstrap() {
    Components.insert({
      userCode: '<div>Hello world!</div>',
      transformedCode: "React.createElement('div', null, 'Hello world!')",
      createdAt: Date.now(),
    });
  },

  newComponent(args) {
    return Components.insert({
      createdAt: args.createdAt,
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
        console.log(args.id);
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
});

import { Meteor } from 'meteor/meteor';
import { transform } from 'babel-core';
import React from 'react';

import { Components } from '../imports/api/components';

Meteor.methods({
  newComponent(args) {
    return Components.insert({
      createdAt: args.createdAt,
    });
  },

  updateComponent(args) {
    let reactComponent = transform(args.jsx, {"presets": ["react"]}).code;
    return Components.update(args.id, {
      $set: {
        jsx: args.jsx,
        reactComponent: reactComponent,
        updatedAt: args.updatedAt,
      }
    });
  },
});

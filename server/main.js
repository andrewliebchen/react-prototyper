import { Meteor } from 'meteor/meteor';
import { transform } from 'babel-core';
import React from 'react';

import { Components } from '../imports/api/components';

Meteor.methods({
  returnReact(args) {
    let reactComponent = transform(args.jsx, {"presets": ["react"]}).code;
    return Components.insert({
      jsx: args.jsx,
      reactComponent: reactComponent,
      createdAt: args.createdAt,
    });
  },
});

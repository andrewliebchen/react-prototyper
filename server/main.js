import { Meteor } from 'meteor/meteor';
import { transform } from 'babel-core';
import React from 'react';


Meteor.methods({
  returnReact(code) {
    let reactCode = eval(transform(code, {"presets": ["react"]}).code);
    return reactCode;
  },
});

import { Meteor } from 'meteor/meteor';
import { transform } from 'babel-core';
import React from 'react';

import { Projects } from '../imports/api/projects';
import { Components } from '../imports/api/components';
import { Styles } from '../imports/api/styles';
import { States } from '../imports/api/states';

// TODO: For state, just use JSON.stringify to get the userValue, or use a GUI

Meteor.startup(() => {
  if (Projects.find().count() === 0) {
    Meteor.call('newProject', {createdAt: Date.now()});
  }
});

// Publications
Meteor.publish('project', (projectId) => {
  return [
    Components.find({project: projectId}),
    Styles.find({project: projectId}),
    States.find({project: projectId}),
    Projects.find({_id: projectId}),
  ];
});

Meteor.publish('preview', (projectId) => {
  return [
    Components.find({project: projectId}),
    States.find({project: projectId}),
  ];
});

// Methods
Meteor.methods({
  stateBootstrap(project) {
    States.insert({
      code: {modal: false},
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
    const bootstrapProject = Projects.insert({
      createdAt: args.createdAt,
    });

    Meteor.call('componentBootstrap', bootstrapProject);
    Meteor.call('stateBootstrap', bootstrapProject);

    console.log(bootstrapProject);

    return bootstrapProject;
  },

  newComponent(args) {
    return Components.insert({
      createdAt: args.createdAt,
      project: args.project,
    });
  },

  newStyle(args) {
    return Styles.insert({
      createdAt: args.createdAt,
      project: args.project,
    });
  },

  updateState(args) {
    let setValue = {};
    setValue[`code.${args.key}`] = args.newValue;
    States.update(args.id, {
      $set: setValue,
    });
  },

  removeState(args) {
    let removeValue = {};
    removeValue[`code.${args.key}`] = args.value;
    console.log(removeValue);
    States.update(args.id, {
      $unset: removeValue,
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
      case 'style':
        update = Styles.update(args.id, {
          $set: {
            userCode: args.userCode,
            transformedCode: args.userCode,
            updatedAt: args.updatedAt,
          }
        });
        break;
    };

    return update;
  },

  deleteComponent(id) {
    Components.remove(id);
  },
});

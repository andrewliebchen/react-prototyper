import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import App from '../imports/ui/App';
import Preview from '../imports/ui/Preview';

const Routes = () =>
  <Router>
    <span>
      {/* <Route exact path="/" component={App}/> */}
      <Route exact path="/:_id/preview" component={Preview}/>
      <Route exact path="/:_id" component={App}/>
    </span>
  </Router>

Meteor.startup(() => {
  render(<Routes/>, document.getElementById('render-target'));
});

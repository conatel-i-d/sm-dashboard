import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FindWizard from './FindWizard'
const Wizard = (props) => {
  return (
    <Switch>
      <Route exact path="/macSearch/findbymac/:id" render={() => <FindWizard {...props } />} />
    </Switch>
  )
}

export default Wizard
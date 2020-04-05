import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CreateModal from './CreateModal'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import FindModal from '../Wizard/FindWizard'
function Modal(props) {
  return (
    <Switch>
      <Route exact path="/macSearch/edit/:id" render={() => <EditModal {...props} />} />
      <Route exact path="/macSearch/delete/:id" render={() => <DeleteModal {...props} />} />
      <Route exact path="/macSearch/create" render={() => <CreateModal {...props} />} />
    </Switch>
  )
}

export default Modal
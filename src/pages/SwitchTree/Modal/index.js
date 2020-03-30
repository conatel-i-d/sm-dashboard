import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CreateModal from './CreateModal.js';
import EditModal from './EditModal.js';
import DeleteModal from './DeleteModal.js';

function Modal(props) {
  return (
    <Switch>
      <Route exact path="/switchesTree/edit/:id" render={() => <EditModal {...props} />} />
      <Route exact path="/switchesTree/delete/:id" render={() => <DeleteModal {...props} />} />
      <Route exact path="/switchesTree/create" render={() => <CreateModal {...props} />} />
    </Switch>
  )
}

export default Modal
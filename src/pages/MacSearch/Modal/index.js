import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CreateModal from './CreateModal'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import FindModal from './FindModal'
function Modal(props) {
  return (
    <Switch>
      <Route exact path="/macSearch/edit/:id" render={() => <EditModal {...props} />} />
      <Route exact path="/macSearch/delete/:id" render={() => <DeleteModal {...props} />} />
      <Route exact path="/macSearch/create" render={() => <CreateModal {...props} />} />
      <Route exact path="/macSearch/findbymac/:id" render={() => <FindModal {...props} />} />
    </Switch>
  )
}

export default Modal
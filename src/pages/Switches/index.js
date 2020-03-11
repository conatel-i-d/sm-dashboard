import React from 'react';
import { connect } from 'react-redux';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';

import './index.css';
import Modal from './Modal';
import Table from './Table';
import Toolbar from './Toolbar.js';
import {
  get as getSwitches,
  create,
  edit,
  destroy,
  updateSortBy,
  getModel
} from '../../state/switches';
import _ from 'lodash'


const ENTITY = 'switches';

export function Switches({
  model,
  sortBy,
  get,
  create,
  edit,
  destroy,
  updateSortBy
}) {
  React.useEffect(() => {
    console.log("deberia ejecutarse el get")
    get();
  }, [get]);

  return (
    <>
      <PageSection
        variant={PageSectionVariants.light}
        className="Switches__Page"
      >
        <Modal
          model={model}
          onAccept={create}
          onEdit={edit}
          onDelete={destroy}
        />
        <Toolbar />
      </PageSection>
      <PageSection
        variant={PageSectionVariants.light}
        className="Switches__Page"
      >
        <Table sortBy={sortBy} onSort={updateSortBy} />
      </PageSection>
    </>
  );
}

export const getState = state => ({
  loading: _.get(state, `${ENTITY}.loading`),
  sortBy: _.get(state, `${ENTITY}.sortBy`),
  model: getModel(state)
});

const getDispatchers = dispatch => ({
  get: (state) => dispatch(getSwitches(state)),
  create: (state) => dispatch(create(state)),
  edit: (state) => dispatch(edit(state)),
  destroy: (state) => dispatch(destroy(state)),
  updateSortBy: (state) => dispatch(updateSortBy(state))
});

export default connect(getState, getDispatchers)(Switches);

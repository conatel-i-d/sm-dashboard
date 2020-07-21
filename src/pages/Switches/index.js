import React from 'react';
import { connect } from 'react-redux';
import {
  PageSection,
  PageSectionVariants,
  Bullseye
} from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';
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
import get from 'lodash/get';

const ENTITY = 'switches';

export function Switches({
  loading,
  model,
  sortBy,
  get,
  create,
  edit,
  destroy,
  updateSortBy
}) {
  React.useEffect(() => {
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
        {loading ? (
          <Bullseye>
            <Spinner />
          </Bullseye>
        ) : (
          <Table sortBy={sortBy} onSort={updateSortBy} />
        )}
      </PageSection>
    </>
  );
}

export const getState = (state) => ({
  loading: get(state, `${ENTITY}.loading`),
  sortBy: get(state, `${ENTITY}.sortBy`),
  model: getModel(state)
});

const getDispatchers = (dispatch) => ({
  get: (state) => dispatch(getSwitches(state)),
  create: (state) => dispatch(create(state)),
  edit: (state) => dispatch(edit(state)),
  destroy: (state) => dispatch(destroy(state)),
  updateSortBy: (state) => dispatch(updateSortBy(state))
});

export default connect(getState, getDispatchers)(Switches);

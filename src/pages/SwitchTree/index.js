import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Tree } from './TreeView'
import Modal from './Modal';
import Toolbar from './Toolbar.js';

import {
  PageSection,
  PageSectionVariants,
  Bullseye
} from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

import { combineStateSelectors } from '../../state/utils';

import './index.css';

import {
  selectAllAsTree ,
  get as getSwitches,
  getModel,
  create,
  edit,
  destroy
} from '../../state/switches';

const ENTITY = 'switches';

var treeState = [
  {
    type: 'branch',
    name: 'Branch #1',
    branches: [
      {
        type: 'leaf',
        value: {
          id: '2255',
          name: 'switch #1 branch #1',
          ip: '11.11.11.11',
          model: 'Cissco 11'
        }
      },
      {
        type: 'branch',
        name: 'Branch #3',
        branches: [
          {
            type: 'leaf',
            value: {
              id: '355',
              name: 'switch #1 branch #3',
              ip: '31.31.31.31',
              model: 'Cissco 31'
            }
          },
          {
            type: 'leaf',
            value: {
              id: '123',
              name: 'switch #2 branch #3',
              ip: '32.32.32.32',
              model: 'Cissco 32'
            }
          }
        ]
      }
    ]
  },
  {
    type: 'branch',
    name: 'Branch #2',
    branches: [
      {
        type: 'branch',
        name: 'Branch #4',
        branches: [
          {
            type: 'branch',
            name: 'Branch #5',
            branches: [
              {
                type: 'leaf',
                value: {
                  id: '1255',
                  name: 'switch #1 branch #2',
                  ip: '21.21.21.21',
                  model: 'Cissco 21'
                }
              }
            ]
          }
        ]
      }
    ]
  }
];


export function SwitchTreePage({
  loading,
  getSwitchesAsTree,
  model,
  get,
  create,
  edit,
  destroy
}) {
  
  React.useEffect(() => { get() }, [get]);
  
  console.log("switches branches", getSwitchesAsTree);
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
        className="Switch__Page Switch__Page-InterfacesTable">
        {loading
          ? <Bullseye><Spinner /></Bullseye>
          : <Tree branches={getSwitchesAsTree}/>
        }
      </PageSection>
    </>
  );
}

export const getState = state => ({
  loading: _.get(state, `${ENTITY}.loading`),
  getSwitchesAsTree: selectAllAsTree(state),
  model: getModel(state)
});

const getDispatchers = dispatch => ({
  get: (state) => dispatch(getSwitches(state)),
  create: (state) => dispatch(create(state)),
  edit: (state) => dispatch(edit(state)),
  destroy: (state) => dispatch(destroy(state)),
});

export default connect(getState, getDispatchers)(SwitchTreePage);

import React from 'react';
import { connect } from 'react-redux';

import { Tree } from './TreeView'

import {
  PageSection,
  PageSectionVariants,
  Bullseye
} from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

import './index.css'
import { getState } from '../Switches';
import { get as getSwitch } from '../../state/switches'
import {
  get as getInterfaces,
  getLoading,
  getState as getNicsState,
  updateSortBy,
  reboot
} from '../../state/nics';

import { combineStateSelectors } from '../../state/utils';

import './index.css';

const ENTITY = 'switches';

var treeState = [
  {
    type: 'branch',
    name: 'Branch #1',
    branches: [
      { 
        type: 'leaf',
        value: {
          name: 'switch #1 branch #1',
          ip: '11.11.11.11',
          model: 'Cissco 11',
          mac_entries: '1,qwe,22f.sd,23.sds,255'
        }
      },
      {
        type: 'leaf',
        value: {
          name: 'switch #1 branch #3',
          ip: '31.31.31.31',
          model: 'Cissco 31',
          mac_entries: '1,qwe,22f.sd,23.sds,255'
        }
      },
      {
        type: 'branch',
        name: 'Branch #3',
        branches: [
          {
            type: 'leaf',
            value: {
              name: 'switch #3 branch #3',
              ip: '33.33.33.33',
              model: 'Cissco 33',
              mac_entries: '3,qwe,22f.sd,23.sds,255'
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
                  name: 'switch #1 branch #2',
                  ip: '21.21.21.21',
                  model: 'Cissco 21',
                  mac_entries: '1,qwe,22f.sd,23.sds,255'
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
  location,
  reboot,
  getSwitch,
  getInterfaces,
  sortBy,
  updateSortBy
}) {
  
  const switchId = React.useMemo(() => location.pathname.replace(`/${ENTITY}/`, ''), [location]);

  React.useEffect(() => {
    getSwitch(switchId);
    getInterfaces(switchId);
  }, [getSwitch, getInterfaces, switchId]);

  return (
    <>
      <PageSection 
        variant={PageSectionVariants.light} 
        className="Switch__Page Switch__Page-InterfacesTable">
        {loading
          ? <Tree branches={treeState}/>
          : <Bullseye><Spinner /></Bullseye>
        }
      </PageSection>
    </>
  );
}

export default connect(
  combineStateSelectors(getState, getNicsState, getLoading),
  {
    getSwitch,
    getInterfaces,
    updateSortBy,
    reboot
  }
)(SwitchTreePage);

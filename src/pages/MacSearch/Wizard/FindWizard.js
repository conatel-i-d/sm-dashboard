import React from 'react';
import { Wizard } from '@patternfly/react-core';

import { history } from '../../../modules/history.js';
import { FindingStep } from './FindingStep.js';
import { InsertMacStep } from './InsertMacStep';

import { isFunction } from '../../../modules/utils';

export const FindWizard = (props) => {
  const { location, cancelFindByMac, onFind, switchesTree } = props;

  const setFindMac = (value) => {
    history.push(`${location.pathname}${location.search.replace()}`)
    location.search.replace('?type=', '').replace(/&search=[a-zA-Z0-9_.-]*/,`&search=${value}`)
  }
  const searchId = React.useMemo(
    () => location.pathname.replace(`/macSearch/findbymac/`, ''),
    [location.pathname]
  );
  const searchType = React.useMemo(
    () => location.search.replace('?type=', '').replace(/&search=.*/),
    [location.search]
  );

  const findMac = React.useMemo(
    () => {
      console.log("use memo befor replace search has", location.search)
      return location.search.replace(/.*&search=/, '')
    },
    [location.search]
  );

  const cancelFind = (text) => {
    if (isFunction(cancelFindByMac)) {
      cancelFindByMac(text);
    }
  };
  const close = () => {
    cancelFind('Cancel find by close find wizard!');
    history.push('/macSearch');
  };
  const steps = [
    {
      name: 'Insert mac',
      component: (
        <InsertMacStep
          {...props}
          searchId={searchId}
          searchType={searchType}
          findMac={findMac}
          handleFinMacChange={(value) => setFindMac(value)}
        />
      ),
      nextButtonText: 'Buscar'
    },
    {
      name: 'Buscando',
      component: (
        <FindingStep
          searchId={searchId}
          searchType={searchType}
          findMac={findMac}
          {...props}
        />
      ),
      nextButtonText: 'Finalizar'
    } // TODO: Pending
  ];

  const goToFind = (newStep) => {
    if (newStep.name === "Buscando") {
      if (searchType === 'switch') {
        onFind({ switchesToFindIds: [searchId], mac: findMac });
      } else {
        const switchesToFind = switchesTree.filter(x => x.name === searchId);
        if (switchesToFind !== undefined) {
          if (switchesToFind[0].branches !== undefined) {
            var switchesToFindIds = switchesToFind[0].branches.map((y) => y.value.id);
            if  (switchesToFindIds.length > 0) {
              onFind({ switchesToFindIds, mac: findMac });
            }
          }
        }
      }
    }
  }

  return (
    <>
      <Wizard
        isOpen={true}
        onClose={close}
        title="Busqueda por Mac"
        onBack={() => {
          cancelFind('Cancel find by back to first step (insert mac form)');
        }}
        onGoToStep={newStep => goToFind(newStep)}
        description={
          searchType === 'switch'
            ? `Buscar la mac ${findMac.toUpperCase()} en el switch ${searchId.toUpperCase()}`
            : `Buscar la mac ${findMac.toUpperCase()} en todos los switches del edificio ${searchId.toUpperCase()}`
        }
        steps={steps}
        startAtStep={findMac === "" ? 1 : 2}
      />
    </>
  );
};

import React from 'react';
import { Wizard } from '@patternfly/react-core';

import { history } from '../../../modules/history.js';
import { FindingStep } from './FindingStep.js';
import { InsertMacStep } from './InsertMacStep';

import { isFunction } from '../../../modules/utils'

export const FindWizard = (props) => {
  const { location, cancelFindByMac } = props;

  const searchId = React.useMemo(
    () => location.pathname.replace(`/macSearch/findbymac/`, ''),
    [location]
  );
  const searchType = React.useMemo(
    () => location.search.replace('?type=', ''),
    [location]
  );

  const cancelFind = (text) => {
    if (isFunction(cancelFindByMac)) {
      cancelFindByMac(text);
    }
  }
  const close = () => {
    cancelFind("Cancel find by close find wizard!");
    history.push('/macSearch');
  };
  const steps = [
    {
      name: 'Insert mac',
      component: (() => <InsertMacStep {...props} searchId={searchId} searchType={searchType} />
      ),
      nextButtonText: 'Buscar'
    },
    {
      name: 'Buscando',
      component: (
        <FindingStep
          searchId={searchId}
          searchType={searchType}
          {...props}
        />
      ),
      nextButtonText: 'Finalizar'
    } // TODO: Pending
  ];

  return (
    <>
      <Wizard
        isOpen={true}
        onClose={close}
        title="Busqueda por Mac"
        onBack={() => { cancelFind("Cancel find by back to first step (insert mac form)") }}
        description={
          searchType === 'switch'
            ? `Buscar mac en el switch ${searchId}`
            : `Buscar mac en todos los switches del edificio ${searchId}`
        }
        steps={steps}
      />
    </>
  );
};

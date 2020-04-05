import './index.css';
import React from 'react';

import workingIcon from './working-icon.gif';

export const FindingStep = (props) => {
  const {
    switchesTree,
    onFind,
    searchType,
    searchId,
    isLoading,
    findResult
  } = props;

  React.useEffect(() => {
    if (searchType == 'switch') {
      onFind({ switchesToFindIds: [searchId] });
    } else {
      const switchesToFindIds = switchesTree
        .filter((x) => x.name === searchId)[0]
        .branches.map((y) => y.value.id);
      onFind({ switchesToFindIds });
    }
  }, [switchesTree, onFind, searchType, searchId]);

  return isLoading ? (
    <div className="pf-l-bullseye">
      <div className="pf-c-empty-state pf-m-lg">
        <h1 className="pf-c-title pf-m-lg">Buscando...</h1>
        <div className="pf-c-empty-state__body">
          <img class="working-icon" src={workingIcon} />
        </div>
        <div className="pf-c-empty-state__body">
          Puede tardar alunos minutos!!!
          <br />
          Para ejecutar esta tarea, el servidor debe conectarse{' '}
          {searchType === 'switch'
            ? 'al switch'
            : 'a todos los switches del edificio'}{' '}
          mediante ssh, ejecutar el comando <i>show mac address-table</i>y luego
          parsear los resultados para poder buscar en la lista la mac. El
          resultado del proceso le presentara en esta pantalla si ha habido
          alguna coincidencia y le mostrara la interface donde se encontro la
          misma.
        </div>
      </div>
    </div>
  ) : (
    <>

    </>
  );
};

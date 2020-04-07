import './index.css';
import React from 'react';

import workingIcon from './working-icon.gif';

export const FindingStep = ({
  switchesTree,
  onFind,
  findMac,
  searchType,
  searchId,
  isLoading,
  findResult
}) => {

  const [errorToLoadSwitches, setErrorToLoadSwitches] = React.useState(false);

  React.useEffect(() => {
    if (searchType == 'switch') {
      onFind({ switchesToFindIds: [searchId], mac: findMac });
    } else {
      const switchesToFind = switchesTree.filter(x => x.name === searchId);
      if (switchesToFind !== undefined) {
        if (switchesToFind[0].branches !== undefined) {
          var switchesToFindIds = switchesToFind[0].branches.map((y) => y.value.id);
        }
      }
      if  (switchesToFindIds.length > 0) {
        onFind({ switchesToFindIds, mac: findMac });
      }
      else {
        setErrorToLoadSwitches(true);
      }
    }
  }, []);

  return errorToLoadSwitches 
  ? <p className="error-load-sws-paragraph">Ha habido un error a cargar los swtiches, debe asegurarse que el nombre del edicicio es correcto y
  que dentro del edificio se encuentra es switch seleccionado, o que el edificio contiene al menos un switch</p>
  : isLoading ? (
    <div className="pf-l-bullseye">
      <div className="pf-c-empty-state pf-m-lg">
        <h1 className="pf-c-title pf-m-lg">Buscando...</h1>
        <div className="pf-c-empty-state__body">
          <img className="working-icon" src={workingIcon} />
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
    <div>
      <table>
        <thead>
          <tr>
            <th>Switch ID</th>
            <th>Swtich Inteface</th>
          </tr>
        </thead>
        <tbody>
          {findResult.map((x) => (
            <tr key={x.interface}>
              <td>{x.switch_id}</td>
              <td>{x.interface}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

import axios from 'axios';
import { getToken, updateToken } from '../utils';

import _ from 'lodash'

import { isValid } from '../nics';
import { addAlert } from '../alerts';

const ENTITY = 'FIND_BY_MAC';

export var cancelFindByMac;

export const findByMac = ({ switchesToFindIds, mac }) => async (dispatch) => {
  dispatch({ type: `@${ENTITY}/POST_REQUEST`, payload: {} });
  try {
    await updateToken();
    var {
      data: { items }
    } = await axios.post(
      `/api/macs/find`,
      { switchesToFindIds },
      {
        headers: { Token: getToken(), 'Content-Type': 'application/json' },
        timeout: 1000*60*3
      }
    );
  } catch (err) {
    console.error(err);
    dispatch(
      addAlert({
        type: 'danger',
        message: `Error al buscar por mac`,
        description: `Error: ${err.message}`
      })
    );
    return dispatch({ type: `@${ENTITY}/POST_ERROR`, payload: err });
  }

  if (items !== undefined) {
    let preResult = [];
    items.map((sw) => {
      // por cada sw, me filtro las interfces validas y las retorno como [[<nic_name>, <nic_value>]]
      const filterNics = Object.entries(sw.interfaces).filter(([nic_name]) =>
        isValid(nic_name)
      );
      filterNics.map(([nic_name, nic_value]) => {
        const { mac_entries } = nic_value;
        if (mac_entries) {
          mac_entries.map((currentMac) => {
            // agrego la interface a preResult => cuando la `mac` ingresada se encuetna en la mac actual
            // o en el caso de que no se halla ingresado, nunca agrego una interface dos veces

            if (
              currentMac.mac_address
                .toLowerCase()
                .includes(mac?.toLowerCase()) &&
              preResult.every(
                ({ switch_name, interface_name }) =>
                  switch_name !== sw.name && interface_name !== nic_name
              )
            ) {
              preResult.push({
                switch_id: sw.id,
                switch_name: sw.name,
                interface_name: nic_name
              });
            }
            return true;
          });
        }
        return true;
      });
      return false;
    });

    const itemsWithUniqueSw = _.uniqBy(preResult, "switch_id");
    const swWithPrimeInterfaces = {};

    // De los swtitches en los que se encontro la mac, me traigo la info de las interfaces desde el prime
    await Promise.all(
      itemsWithUniqueSw.map(async sw => {
        try {
          await updateToken();
          var {
            data: { item }
          } = await axios.get(`/api/switch/${sw.switch_id}/nics_prime`, {
            headers: { Token: getToken(), 'Content-Type': 'application/json' }
          });
          if (item !== undefined) {
            swWithPrimeInterfaces[sw.switch_name] = item;
          }
          else throw Error("Items is undefined in nics_prime");
        } catch (err) {
          console.log(
            `No se pudieron obtener las interfaces desde el prime para el switch ${sw.switch_name}.`, `Error: ${err}`
          );
        }
      }))

      // Con las macs encontradas y las info de las interfaces, filtro las que sean trunk o esten down y armo la respuesta.
      const result = []; 
      preResult.map(pr => {
        if (swWithPrimeInterfaces) {
          if (swWithPrimeInterfaces[pr.switch_name]) {
            if (swWithPrimeInterfaces[pr.switch_name][pr.interface_name]) {
              const iface = swWithPrimeInterfaces[pr.switch_name][pr.interface_name];
              if (iface.operationalStatus.toLowerCase().includes('down') || 
                iface.desiredVlanMode.toLowerCase().includes('trunk') ||
                iface.description.toLowerCase().includes('trunk') ||
                iface.tunkingEncapsulationNegotiation) {
                  return undefined;
                }
          }
        }
      }
      result.push(pr)
      return pr;
      })
      return dispatch({ type: `@${ENTITY}/POST_SUCCESS`, payload: result });
    }
    dispatch({
      type: `@${ENTITY}/POST_ERROR`,
      payload: new Error('No `items` key found on response')
    });
  }

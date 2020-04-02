import React from 'react';
import { Button, Modal as PatternflyModal, Form as PatternflyForm, FormGroup, TextInput } from '@patternfly/react-core';
import { history } from '../../../modules/history.js';

import { onClose } from './helpers.js';

function CreateModal({ location, onFind }) {
  const searchId = React.useMemo(() => location.pathname.replace(`/macSearch/findbymac/`, ''), [location]);
  const searchType = React.useMemo(() => location.search.replace('?type=', ''), [location]);
  const [state, setState] = React.useState({ findMac: '', searchId, searchType });
  
  console.log(`searchId: ${searchId},  searchType: ${searchType}`);

  return (
    <PatternflyModal
      isSmall
      title="Crear un nuevo Switch"
      isOpen={true}
      onClose={onClose}
      actions={[
        <Button key="confirm" variant="primary" onClick={handleSubmit}>
          Crear Switch
        </Button>,
        <Button key="cancel" variant="link" onClick={onClose}>
          Cancelar operación
        </Button>
      ]}
      isFooterLeftAligned
    >
      <PatternflyForm>
        <FormGroup label="Nombre" isRequired fieldId="switch-form-name">
          <TextInput
            isRequired
            type="text"
            id="switch-form-name"
            name="switch-form-name"
            aria-describedby="switch-form-name-helper"
            value={state.findMac}
            onChange={value => {
              setState({ ...state, findMac: value });
            }}
          />
        </FormGroup>
      </PatternflyForm>
    </PatternflyModal>
  );

  function handleSubmit(state) {
    onFind(state);
    // Todo: debería dejar un spinner cargando hasta tener result, si result ok pasar a descripción
    history.push('/foundMacResult');
  }
}

export default CreateModal;

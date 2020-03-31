import React from 'react';
import { Button, Modal as PatternflyModal, Form as PatternflyForm, FormGroup, TextInput } from '@patternfly/react-core';
import { history } from '../../../modules/history.js';

import { onClose } from './helpers.js';

function CreateModal({ onFind }) {
  const [findMac, setFindMac] = React.useState('');

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
            value={findMac}
            onChange={value => {
              setFindMac(value);
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

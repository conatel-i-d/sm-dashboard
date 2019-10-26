import React from 'react';
import { Button, Modal as PatternflyModal } from '@patternfly/react-core';

import Form from '../Form';

const defaultState = {
  name: '',
  description: '',
  model: '',
  ip: ''
};

function Modal({ isModalOpen, onAccept, onClose }) {
  const [state, setState] = React.useState(defaultState);
  return (
    <PatternflyModal
      isSmall
      title="Crear un nuevo Switch"
      isOpen={isModalOpen}
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
      <Form model={state} onChange={setState} />
    </PatternflyModal>
  );

  function handleSubmit() {
    onAccept(state);
    onClose();
    setState(defaultState);
  }
}

export default Modal
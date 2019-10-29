import React from 'react';
import { Button, Modal as PatternflyModal } from '@patternfly/react-core';

import Form from '../Form.js';
import { onClose } from './helpers.js';

function CreateModal({ onAccept, model }) {
  const [state, setState] = React.useState(model);

  React.useEffect(() => setState(model), [model, setState]);

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
      <Form model={state} onChange={setState} />
    </PatternflyModal>
  );

  function handleSubmit() {
    onAccept(state);
    onClose();
  }
}

export default CreateModal;
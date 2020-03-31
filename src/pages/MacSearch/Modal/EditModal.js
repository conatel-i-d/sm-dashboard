import React from 'react';
import get from 'lodash/get'
import { Button, Modal as PatternflyModal } from '@patternfly/react-core';

import Form from '../Form.js';
import { onClose } from './helpers.js';

function EditModal({ model, onEdit }) {
  const [state, setState] = React.useState(model);

  React.useEffect(() => setState(model), [model, setState]);

  return (
    <PatternflyModal
      isSmall
      title={`Editando Switch #${get(model, 'id', '')}`}
      isOpen={true}
      onClose={onClose}
      actions={[
        <Button key="confirm" variant="primary" onClick={handleSubmit}>
          Guardar Cambios
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
    onEdit(state);
    onClose();
  }
}

export default EditModal;
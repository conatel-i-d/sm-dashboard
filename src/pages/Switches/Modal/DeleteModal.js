import React from 'react';
import get from 'lodash/get';
import { Button, Modal as PatternflyModal } from '@patternfly/react-core';

import { onClose } from './helpers.js';

function DeleteModal({ model, onDelete }) {
  const [state, setState] = React.useState(model);

  React.useEffect(() => setState(model), [model, setState]);

  return (
    <PatternflyModal
      isSmall
      title="Atención"
      isOpen={true}
      onClose={onClose}
      actions={[
        <Button key="confirm" variant="primary" onClick={handleSubmit}>
          Si, deseo eliminar el Switch
        </Button>,
        <Button key="cancel" variant="link" onClick={onClose}>
          Cancelar operación
        </Button>
      ]}
      isFooterLeftAligned
    >
      <b>{`¿Esta seguro que desea eliminar el Switch #${get(model, 'id', '')}?`}</b>
    </PatternflyModal>
  );

  function handleSubmit() {
    onDelete(state);
    onClose();
  }
}

export default DeleteModal;
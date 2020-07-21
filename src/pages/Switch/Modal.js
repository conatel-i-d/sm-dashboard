import React from 'react';
import { Button, Modal as PatternflyModal } from '@patternfly/react-core';
import { history } from '../../modules/history.js';

function ResetModal({ onReboot, location }) {
  const switchId = React.useMemo(() => location.pathname.replace(`/switches/`, '').replace('/reboot', ''), [location]);
  const name = React.useMemo(() => location.search.replace('?name=', ''), [location]);
  return (
    <PatternflyModal
      isSmall
      title="Atención"
      isOpen={true}
      onClose={() => onClose(switchId)}
      actions={[
        <Button key="confirm" variant="primary" onClick={handleSubmit}>
          Si, deseo reiniciar la interfaz
        </Button>,
        <Button key="cancel" variant="link" onClick={() => onClose(switchId)}>
          Cancelar operación
        </Button>
      ]}
      isFooterLeftAligned
    >
      <b>{`¿Esta seguro que desea reiniciar la interfaz ${name}?`}</b>
    </PatternflyModal>
  );

  function handleSubmit() {
    onReboot({ name, switchId });
    onClose(switchId);
  }
}

export function onClose(id) {
  history.push(`/switches/${id}`);
}

export default ResetModal;
